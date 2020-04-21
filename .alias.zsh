# Functions

pushit(){
  print -P -- ""
  print -P -- "%F{009}Oooh, baby, baby. Baby, baby. Oooh, baby, baby. Baby, baby%f"
  print -P -- "%F{009}Ah, push it - push it good. Ah, push it - push it real good%f"
  print -P -- ""
  git push -u
}

nomnom(){
  print -P -- ""
  print -P -- "%F{009}(ˆڡˆ)v (ˆڡˆ)v nom nom nom (ˆڡˆ)v (ˆڡˆ)v%f"
  print -P -- ""
  npm "$@"
}

get_repo_branch() {
  ref=$(git symbolic-ref HEAD | cut -d'/' -f3)
  echo $ref
}

make_and_cd() {
	mkdir -p "$1" && cd "$1";
}

go_back() {
    str=""
    count=0
    while [ "$count" -lt "$1" ];
    do
        str=$str"../"
        let count=count+1
    done
    cd $str
}

get_bitrate () {
    echo `basename "$1"`: `file "$1" | sed 's/.*, \(.*\)kbps.*/\1/' | tr -d " " ` kbps
}

download_iplayer () {
	get_iplayer --get --pid "$1" --pid-recursive
}

download_youtube_audio () {
	youtube-dl --extract-audio --audio-format mp3 --audio-quality 0 "$1"
}

download_youtube_video () {
	youtube-dl "$1"
}

flac_to_mp3 () {
	local bitrate="${1:-320}"
	for file in **/*.flac; do
		ffmpeg -i "$file" -ab "$bitrate"k -map_metadata 0 -id3v2_version 3 "${file%.flac}".mp3
	done
}

# Public Alises

alias server='python -m SimpleHTTPServer' # web server with the current dir as root. localhost:8000
alias npmglobal='npm list -g --depth=0' # npm global packages
alias ls-scrips='cat package.json | jq -r .scripts' # print npm scripts
alias printsimple='for n in *; do printf '%s\n' "$n"; done' # print file/directory names only
alias shf='defaults write com.apple.finder AppleShowAllFiles -bool true; killall Finder' # show hidden files
alias hhf='defaults write com.apple.finder AppleShowAllFiles -bool false; killall Finder' # hide hidden files

alias gci='git commit' # git commit
alias gita='git add -i' # git add -i
alias gitb='git create-branch' # git create-branch <name>
alias log='yolog' # yolog
alias conflict='code `git diff --name-only | uniq`' # show files with conflicts
alias clustergit="find . -maxdepth 1 -mindepth 1 -type d -exec sh -c '(echo {} && cd {} && git status && echo)' \;" # git status all the repos
alias prune='git branch --merged master | grep -v "\* master" | xargs -n 1 git branch -d' # delete merged branches
alias gbd='for k in `git branch|perl -pe s/^..//`;do echo -e `git show --pretty=format:"%Cgreen%ci %Cblue%cr%Creset" $k|head -n 1`\\t$k;done|sort -r' # print out list of all branches with last commit date to the branch
alias gitp='pushit' # git push current branch
alias gitpr='git push -u origin $(get_repo_branch)' # git push branch to remote. gitpr <name-of-branch>

alias nom='nomnom' # nom instead of npm
alias mcd='make_and_cd' # make directory and cd into it
alias b='go_back' # go back x directories
alias bitrate='get_bitrate' # show bitrate of mp3 file. birate <name>.mp3
alias bitrateall='for f in *.mp3; do get_bitrate $f; done' # show bitrate of all mp3 files in dir
alias iplayer='download_iplayer' # download iplayer show via URL, https://github.com/get-iplayer/get_iplayer
alias ytaudio='download_youtube_audio' # download youtube audio as a MP3 file, https://github.com/ytdl-org/youtube-dl
alias ytvideo='download_youtube_video' # download youtube audio as a MP4 file, https://github.com/ytdl-org/youtube-dl
alias flactomp3='flac_to_mp3' # recursively convert .flac to .mp3 - e.g. "flactomp3 256" defaults to 320kbps with no arg