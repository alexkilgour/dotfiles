# set up a web server with the current directory as the web root, available at localhost:8000
alias server='python -m SimpleHTTPServer'

# npm global packages
alias npmglobal='npm list -g --depth=0'

# hidden files
alias shf='defaults write com.apple.finder AppleShowAllFiles -bool true; killall Finder'
alias hhf='defaults write com.apple.finder AppleShowAllFiles -bool false; killall Finder'

# git alias
alias gits='show_status -d ~/repositories'
alias gci='git commit'
alias grb='git rebase'
alias gita='git add -i'
alias log='yolog'
alias conflict='code `git diff --name-only | uniq`'
alias clustergit="find . -maxdepth 1 -mindepth 1 -type d -exec sh -c '(echo {} && cd {} && git status && echo)' \;"

# print out list of all branches with last commit date to the branch
alias gbd='for k in `git branch|perl -pe s/^..//`;do echo -e `git show --pretty=format:"%Cgreen%ci %Cblue%cr%Creset" $k|head -n 1`\\t$k;done|sort -r'

# git push current branch
pushit(){
  echo "${ORANGE}Oooh, baby, baby. Baby, baby. Oooh, baby, baby. Baby, baby${D}"
  echo "${ORANGE}Ah, push it - push it good. Ah, push it - push it real good${D}"
  git push -u
}
alias gitp='pushit'

# git push branch to remote
# gitpr <name-of-branch>
get_repo_branch() {
  ref=$(git symbolic-ref HEAD | cut -d'/' -f3)
  echo $ref
}
alias gitpr='git push -u origin $(get_repo_branch)'