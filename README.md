# dotfiles
git aliases, zsh settings, custom fonts and editor configs

## font
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
