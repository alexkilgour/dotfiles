# path
PATH="/usr/local/opt/gnupg@1.4/libexec/gpgbin:$HOME/Library/Python/2.7/bin:$HOME/bin:$HOME/.cargo/bin:$PATH"

# antigen
source ~/.antigen.zsh

# editor
export EDITOR=/usr/bin/nano
export VISUAL=/usr/bin/nano

# java
export JAVA_HOME="$(/usr/libexec/java_home)"

# NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

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

# travis cli
[ -f ~/.travis/travis.sh ] && source ~/.travis/travis.sh

# show all aliases
allalias() {
  for k in "${(@k)aliases}"; do
	print -P -- "%F{189}$k%f -> %F{250}$aliases[$k]%f"
  done
}

# Print out all my aliases
helpme() {
	all_name="allalias"
	all_comment="print all aliases from zsh"
	my_name="helpme"
	my_comment="print my custom aliases"

	printf "\e[38;5;189m%11s\e[0m \e[38;5;250m%s\e[0m\n" $my_name $my_comment
	printf "\e[38;5;189m%11s\e[0m \e[38;5;250m%s\e[0m\n" $all_name $all_comment

	if [ -f ~/.alias.zsh ]; then
		grep "^alias" ~/.alias.zsh | while read -r line ; do
			a=("${(@s/=/)line}")
			name=("${(@s/ /)a}")
			comment=("${(@s/# /)a}")
			printf "\e[38;5;189m%11s\e[0m \e[38;5;250m%s\e[0m\n" $name[2] $comment[2]
		done
	fi

	if [ -f ~/.privatealias.zsh ]; then
		grep "^alias" ~/.privatealias.zsh | while read -r line ; do
			a=("${(@s/=/)line}")
			name=("${(@s/ /)a}")
			comment=("${(@s/# /)a}")
			printf "\e[38;5;189m%11s\e[0m \e[38;5;250m%s\e[0m\n" $name[2] $comment[2]
		done
	fi
}

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

antigen bundle mafredri/zsh-async

# Pure prompt (https://github.com/sindresorhus/pure)
# antigen bundle sindresorhus/pure

# Spaceship theme
antigen theme https://github.com/denysdovhan/spaceship-prompt

# Other bundles
antigen bundle lukechilds/zsh-nvm

# Kerb Kings Cross
antigen bundle https://github.com/alexkilgour/kerbside

# Tell antigen that you're done.
antigen apply
