# antigen
source ~/.antigen.zsh

# editor
export EDITOR=/usr/bin/nano
export VISUAL=/usr/bin/nano

# aliases
if [ -f ~/.alias.zsh ]; then
    source ~/.alias.zsh
else
    print "404: ~/.alias.zsh not found."
fi

# private aliases
if [ -f ~/.privatealias.zsh ]; then
    source ~/.privatealias.zsh
else
    print "404: ~/.privatealias.zsh not found."
fi

# Load the oh-my-zsh's library.
antigen use oh-my-zsh

# Bundles from the default repo (robbyrussell's oh-my-zsh).
antigen bundle git
antigen bundle heroku
antigen bundle pip
antigen bundle lein
antigen bundle command-not-found
antigen bundle autojump
antigen bundle brew
antigen bundle common-aliases
antigen bundle compleat
antigen bundle git-extras
antigen bundle npm
antigen bundle osx
antigen bundle web-search
antigen bundle z
antigen bundle zsh-users/zsh-syntax-highlighting
antigen bundle zsh-users/zsh-history-substring-search ./zsh-history-substring-search.zsh

# Pure prompt (https://github.com/sindresorhus/pure)
antigen bundle mafredri/zsh-async
antigen bundle sindresorhus/pure

# Other bundles
antigen bundle lukechilds/zsh-nvm

# Tell antigen that you're done.
antigen apply
