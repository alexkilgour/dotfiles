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

## shell
* Switch to ZSH `chsh -s $(which zsh)`
* Symlink the following files:

```bash
ln -sf $HOME/path/to/dotfiles/.alias.zsh $HOME/.alias.zsh
ln -sf $HOME/path/to/dotfiles/.antigen.zsh $HOME/.antigen.zsh
ln -sf $HOME/path/to/dotfiles/.hyper.js $HOME/.hyper.js
ln -sf $HOME/path/to/dotfiles/.zshrc $HOME/.zshrc
ln -sf $HOME/path/to/CLOUD/.zsh_history $HOME/.zsh_history
ln -sf $HOME/path/to/CLOUD/.privatealias.zsh $HOME/.privatealias.zsh
```

## vscode
1. Install [Fira Code](https://github.com/tonsky/FiraCode) font
1. Symlink the `vscode.settings.json` from this repo
```bash
$ ln -s $HOME/path/to/dotfiles/vscode.settings.json $HOME/Library/Application\ Support/Code/User/settings.json
```
2. Install the extensions from the command line
```bash
$ node vscode-install.js
```

To view currently installed extensions use `$ code --list-extensions`
