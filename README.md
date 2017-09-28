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
Symlink the `settings.json` and extensions folder from this repo
```bash
$ ln -s $HOME/path/to/dotfiles/vscode-extensions $HOME/.vscode/extensions
$ ln -s $HOME/path/to/dotfiles/vscode.settings.json $HOME/Library/Application\ Support/Code/User/settings.json
```
