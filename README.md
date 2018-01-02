# dotfiles
git aliases, zsh settings, custom fonts and editor configs

## colors
Uses [Material Design color theme](https://github.com/MartinSeeler/iterm2-material-design)
1. _iTerm2 > Preferences > Profiles > Colors Tab_
2. Click Load Presets...
3. Click Import...
4. Select the `material-design-colors.itermcolors` file (included)
5. Select the `material-design-colors` from Load Presets...

## font
* _iTerm2 > Preferences > Profiles > Text_
* [`Menlo`](Menlo-Regular.ttf)
* [`Range Mono`](https://pilgrimfonts.com/range-mono/) (paid)
* [`Droid Sans Mono`](https://github.com/AlbertoDorado/droid-sans-mono-zeromod)
* [`Source Code Pro`](https://github.com/adobe-fonts/source-code-pro)

## vscode
1. Symlink the `vscode.settings.json` from this repo
```bash
$ ln -s $HOME/path/to/dotfiles/vscode.settings.json $HOME/Library/Application\ Support/Code/User/settings.json
```
2. Install [Extension Manager by webstp](https://marketplace.visualstudio.com/items?itemName=webstp.extension-manager)
3. Hit `F1` and run `Extension Manager: Install Missing Extensions`
