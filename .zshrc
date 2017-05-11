# antigen
source ~/.antigen.zsh

# aliases
if [ -f ./.alias.zsh ]; then
    print "aliases: ./.alias.zsh added."
    source ./.alias.zsh
else
    print "404: ./.alias.zsh not found."
fi

# private aliases
if [ -f ./.privatealias.zsh ]; then
    print "aliases: ./.privatealias.zsh added."
    source ./.privatealias.zsh
else
    print "404: ./.privatealias.zsh not found."
fi

# Powerline
POWERLEVEL9K_INSTALLATION_PATH=~/.antigen/repos/https-COLON--SLASH--SLASH-github.com-SLASH-bhilburn-SLASH-powerlevel9k.git/powerlevel9k.zsh-theme
POWERLEVEL9K_MODE='awesome-patched'
POWERLEVEL9K_PROMPT_ON_NEWLINE=false
POWERLEVEL9K_PROMPT_ADD_NEWLINE=true
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(context dir vcs)
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(status ssh root_indicator background_jobs history node_version ip)
POWERLEVEL9K_STATUS_VERBOSE=true
POWERLEVEL9K_SHORTEN_STRATEGY=truncate_with_folder_marker
#POWERLEVEL9K_CONTEXT_TEMPLATE="%n@%m"
POWERLEVEL9K_CONTEXT_TEMPLATE="%n"
POWERLEVEL9K_CONTEXT_DEFAULT_BACKGROUND=$DEFAULT_COLOR_INVERTED
POWERLEVEL9K_CONTEXT_DEFAULT_FOREGROUND=$DEFAULT_COLOR
POWERLEVEL9K_CONTEXT_ROOT_BACKGROUND=227
POWERLEVEL9K_HOME_ICON=''
POWERLEVEL9K_HOME_SUB_ICON=''
POWERLEVEL9K_FOLDER_ICON=''
POWERLEVEL9K_NETWORK_ICON=''

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

# Other bundles
antigen bundle lukechilds/zsh-nvm

# Load the theme.
#antigen theme af-magic
antigen theme bhilburn/powerlevel9k powerlevel9k

# Tell antigen that you're done.
antigen apply
