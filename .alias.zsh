# set up a web server with the current directory as the web root
# available at localhost:8000
alias server='python -m SimpleHTTPServer'

# npm global packages
alias npmglobal='npm list -g --depth=0'

# print npm scripts
alias ls-scrips='cat package.json | jq -r .scripts'

# print file/directory names only
alias printsimple='for n in *; do printf '%s\n' "$n"; done'

# hidden files
alias shf='defaults write com.apple.finder AppleShowAllFiles -bool true; killall Finder'
alias hhf='defaults write com.apple.finder AppleShowAllFiles -bool false; killall Finder'

# git alias
alias gci='git commit'
alias gita='git add -i'
alias gitb='git create-branch'
alias log='yolog'
alias conflict='code `git diff --name-only | uniq`'
alias clustergit="find . -maxdepth 1 -mindepth 1 -type d -exec sh -c '(echo {} && cd {} && git status && echo)' \;"
alias prune='git branch --merged master | grep -v "\* master" | xargs -n 1 git branch -d'

# print out list of all branches with last commit date to the branch
alias gbd='for k in `git branch|perl -pe s/^..//`;do echo -e `git show --pretty=format:"%Cgreen%ci %Cblue%cr%Creset" $k|head -n 1`\\t$k;done|sort -r'

# git push current branch
pushit(){
  print -P -- ""
  print -P -- "%F{009}Oooh, baby, baby. Baby, baby. Oooh, baby, baby. Baby, baby%f"
  print -P -- "%F{009}Ah, push it - push it good. Ah, push it - push it real good%f"
  print -P -- ""
  git push -u
}
alias gitp='pushit'

# alias npm to nom
nomnom(){
  print -P -- ""
  print -P -- "%F{009}(ˆڡˆ)v (ˆڡˆ)v nom nom nom (ˆڡˆ)v (ˆڡˆ)v%f"
  print -P -- ""
  npm "$@"
}
alias nom='nomnom'

# git push branch to remote
# gitpr <name-of-branch>
get_repo_branch() {
  ref=$(git symbolic-ref HEAD | cut -d'/' -f3)
  echo $ref
}
alias gitpr='git push -u origin $(get_repo_branch)'

# make directory and cd into it
mcd() {
	mkdir -p "$1" && cd "$1";
}

# go back x directories
b() {
    str=""
    count=0
    while [ "$count" -lt "$1" ];
    do
        str=$str"../"
        let count=count+1
    done
    cd $str
}

# bitrate of mp3 file
get_bitrate () {
    echo `basename "$1"`: `file "$1" | sed 's/.*, \(.*\)kbps.*/\1/' | tr -d " " ` kbps
}
alias bitrate='get_bitrate'
alias bitrateall='for f in *.mp3; do get_bitrate $f; done'