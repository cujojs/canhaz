#!/bin/sh

##############################################################
# canhaz install script
# Works from github or locally
##############################################################

ME="canhaz"

##############################################################
# Remote mode
# Pull from git, then run local install and cleanup
##############################################################
if [[ ! -f "$0" ]]; then
	GITHUB_URL="git@github.com:briancavalier/${ME}.git"
	# GITHUB_URL="git@github.com:unscriptable/cssx.git"
	# Make a reasonable tmp dir
	TMP_DIR="/tmp/${ME}-install.$$"
	mkdir -p "$TMP_DIR"
	git clone "$GITHUB_URL" "$TMP_DIR"
	
	# Go to tmp dir and run this install.sh script again
	# in local mode
	pushd $TMP_DIR >> /dev/null
	./install.sh
	popd >> /dev/null
	
	# Cleanup and exit
	rm -rf "$TMP_DIR"
	exit 0
fi

##############################################################
# Local mode
# Actually do the install
##############################################################
DEST="${HOME}/.${ME}"
echo "Installing in $DEST"
mkdir -p "$DEST"

LOG="$DEST/install.log"
echo "---------------------------------------" >> "$LOG"
echo "Installing ${ME}" >> "$LOG"
echo `date` >> "$LOG"

# Use rsync to install.  This should allow install.sh to
# work as an updater also.
rsync -avp ./* "$DEST/" >> "$LOG"
chmod -R a+x ${DEST}/bin/*

# If we're sudo'ed, chmod files back to original user
if [[ "$SUDO_USER" != "" ]]
then
	chown -R "$SUDO_USER" "$DEST"
fi

# Create symlink
EXE_DIR="/usr/local/bin"
mkdir -p "$EXE_DIR"

EXE="$EXE_DIR/$ME"
if [[ -e "$EXE" ]]
then
	echo "WARNING: $EXE already exists, not creating symlink" | tee -a "$LOG"
	exit 1
else
	ln -s $DEST/bin/generate "$EXE"
	echo "Linked $EXE -> $DEST/bin/generate" | tee -a "$LOG"
fi