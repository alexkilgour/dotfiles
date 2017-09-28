// The some things from 'vscode', which contains the VS Code extensibility API
var vscode_1 = require('vscode');
// For HTTP/s address validation
var validator = require('validator');
// For checking broken links
var brokenLink = require('broken-link');
// For checking relative URIs against the local file system
var path = require('path');
var fs = require('fs');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(disposables) {
    // Create the diagnostics collection
    var diagnostics = vscode_1.languages.createDiagnosticCollection();
    console.log("Link checker active");
    // Wire up onChange events
    vscode_1.workspace.onDidChangeTextDocument(function (event) {
        checkLinks(event.document, diagnostics);
    }, undefined, disposables);
    vscode_1.workspace.onDidOpenTextDocument(function (event) {
        checkLinks(event, diagnostics);
    }, undefined, disposables);
    vscode_1.commands.registerCommand('extension.generateLinkReport', generateLinkReport);
}
exports.activate = activate;
/*
* Checks links for errors. Currently this is just checking for a country code.
* For example, /en-us/ in the URL.
*
* NOTE: Checking for broken links is not integrated in this, as checking for
* those takes a long time, and this function needs to generate diagnostics every
* time the document changes, so needs to complete quickly
*/
function checkLinks(document, diagnostics) {
    //Clear the diagnostics because we're sending new ones each time
    diagnostics.clear();
    // Get all Markdown style lnks in the document
    getLinks(document).then(function (links) {
        // Iterate over the array, generating an array of promises
        var countryCodePromise = Promise.all(links.map(function (link) {
            // For each link, check the country code...
            return isCountryCodeLink(link);
            // Then, when they are all done..
        }));
        // Finally, let's complete the promise for country code...
        countryCodePromise.then(function (countryCodeDiag) {
            // Then filter out null ones
            var filteredDiag = countryCodeDiag.filter(function (diagnostic) { return diagnostic != null; });
            // Then add the diagnostics
            diagnostics.set(document.uri, filteredDiag);
        });
    }).catch();
}
// Generate a report of broken, country code, etc. links and the line they occur on
function generateLinkReport() {
    // Get the current document
    var document = vscode_1.window.activeTextEditor.document;
    // Create an output channel for displaying broken links
    var outputChannel = vscode_1.window.createOutputChannel("Checked links");
    // Show the output channel in column three
    outputChannel.show(vscode_1.ViewColumn.Three);
    // Get all Markdown style lnks in the document
    getLinks(document).then(function (links) {
        // Loop over the links
        links.forEach(function (link) {
            // Get the line number, because internally it's 0 based, but not in display
            var lineNumber = link.lineText.lineNumber + 1;
            // Is it an HTTPS link or a relative link?
            if (isHttpLink(link.address)) {
                // And check if they are broken or not.
                brokenLink(link.address, { allowRedirects: true }).then(function (answer) {
                    // Also check for country code
                    if (hasCountryCode(link.address)) {
                        outputChannel.appendLine("Warning: " + link.address + " on line " + lineNumber + " contains a country code.");
                    }
                    // Log to the outputChannel
                    if (answer) {
                        outputChannel.appendLine("Error: " + link.address + " on line " + lineNumber + " is unreachable.");
                    }
                    else {
                        outputChannel.appendLine("Info: " + link.address + " on line " + lineNumber + ".");
                    }
                });
            }
            else {
                if (isFtpLink(link.address)) {
                    // We don't do anything with FTP
                    outputChannel.appendLine("Info: " + link.address + " on line " + lineNumber + " is an FTP link.");
                }
                else {
                    // Must be a relative path, but might not be, so try it...
                    try {
                        // Find the directory from the path to the current document
                        var currentWorkingDirectory = path.dirname(document.fileName);
                        // Use that to resolve the full path from the relative link address
                        // The `.split('#')[0]` at the end is so that relative links that also reference an anchor in the document will work with file checking.
                        var fullPath = path.resolve(currentWorkingDirectory, link.address).split('#')[0];
                        // Check if the file exists and log appropriately
                        if (fs.existsSync(fullPath)) {
                            outputChannel.appendLine("Info: " + link.address + " on line " + lineNumber + ".");
                        }
                        else {
                            outputChannel.appendLine("Error: " + link.address + " on line " + lineNumber + " does not exist.");
                        }
                    }
                    catch (error) {
                        // If there's an error, log the link
                        outputChannel.appendLine("Error: " + link.address + " on line " + lineNumber + " is not an HTTP/s or relative link.");
                    }
                }
            }
        });
    });
}
// Parse the MD style links out of the document
function getLinks(document) {
    // Return a promise, since this might take a while for large documents
    return new Promise(function (resolve, reject) {
        // Create arrays to hold links as we parse them out
        var linksToReturn = new Array();
        // Get lines in the document
        var lineCount = document.lineCount;
        //Loop over the lines in a document
        for (var lineNumber = 0; lineNumber < lineCount; lineNumber++) {
            // Get the text for the current line
            var lineText = document.lineAt(lineNumber);
            // Are there links?
            var links = lineText.text.match(/\[[^\[]+\]\([^\)]+\)|\[[a-zA-z0-9_-]+\]:\s*\S+/g);
            if (links) {
                // Iterate over the links found on this line
                for (var i = 0; i < links.length; i++) {
                    // Get the URL from each individual link
                    // ([^\)]+) captures inline style link address
                    // (\S+) captures reference style link address
                    var link = links[i].match(/\[[^\[]+\]\(([^\)]+)\)|\[[a-zA-z0-9_-]+\]:\s*(\S+)/);
                    // Figure out which capture contains the address; inline style or reference
                    var address = (link[2] == null) ? link[1] : link[2];
                    //Push it to the array
                    linksToReturn.push({
                        text: link[0],
                        address: address,
                        lineText: lineText
                    });
                }
            }
        }
        if (linksToReturn.length > 0) {
            //Return the populated array, which completes the promise.
            resolve(linksToReturn);
        }
        else {
            //Reject, because we found no links
            reject;
        }
    }).catch();
}
// Check for addresses that contain country codes
function isCountryCodeLink(link) {
    var countryCodeDiag = null;
    //If one was found...
    if (hasCountryCode(link.address)) {
        //Create the diagnostics object
        countryCodeDiag = createDiagnostic(vscode_1.DiagnosticSeverity.Warning, link.text, link.lineText, "Link " + link.address + " contains a language reference: " + hasCountryCode[0] + " ");
    }
    return countryCodeDiag;
}
function hasCountryCode(linkToCheck) {
    //Regex for country-code
    var hasCountryCode = linkToCheck.match(/\/[a-z]{2}\-[a-z]{2}\//);
    return hasCountryCode ? true : false;
}
// Is this a valid HTTP/S link?
function isHttpLink(linkToCheck) {
    // Use the validator to avoid writing URL checking logic
    return validator.isURL(linkToCheck, { require_protocol: true, protocols: ['http', 'https'] }) ? true : false;
}
// Is this an FTP link?
function isFtpLink(linkToCheck) {
    return linkToCheck.toLowerCase().startsWith('ftp');
}
// Generate a diagnostic object
function createDiagnostic(severity, markdownLink, lineText, message) {
    // Get the location of the text in the document
    // based on position within the line of text it occurs in
    var startPos = lineText.text.indexOf(markdownLink);
    var endPos = startPos + markdownLink.length - 1;
    var start = new vscode_1.Position(lineText.lineNumber, startPos);
    var end = new vscode_1.Position(lineText.lineNumber, endPos);
    var range = new vscode_1.Range(start, end);
    // Create the diagnostic object
    var diag = new vscode_1.Diagnostic(range, message, severity);
    // Return the diagnostic
    return diag;
}
//# sourceMappingURL=extension.js.map