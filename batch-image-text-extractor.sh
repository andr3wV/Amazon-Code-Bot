#!/bin/bash
clear

###
#
#	REQUIREMENTS
#
#	Bash, tesseract-ocr and image files to work on. Tip: Use batch-pdf-image-extractor.sh to extract images from PDF files.
#
#
#	WHAT TO EXPECT
#
#
#	Batch PDF Image Extractor will use tesseract-ocr to extract text from all image files stored in the same directory as this script.
#
###



##
#
# Configs
#
##

inputFormat='jpg jpeg png' # State a single input format of the images to be processed.
outputFormat='txt' # State a single output format for the text file that contains the extracted text.
organize='move' # 'copy' or 'move' all files into subdirectories organised by extension type. Leave empty for no organization.

## END Configs




title="Batch Image Text Extractor"


###
#
# System Checks
#
###

	###
	#
	#	Confirm we are running in a terminal
	#		If not, try to launch this program in a terminal
	#
	###

	tty -s

	if test "$?" -ne 0
	then

		terminal=( konsole gnome-terminal x-terminal-emulator xdg-terminal terminator urxvt rxvt Eterm aterm roxterm xfce4-terminal termite lxterminal xterm )
		for i in ${terminal[@]}; do
			if command -v $i > /dev/null 2>&1; then
				exec $i -e "$0"
				break
			fi
		done

	fi


	###
	#
	#	Check for required software dependencies
	#
	###

	printf "\nTesting for necessary software requirements:\n\n"

	error=0
	requirement=( tesseract )
	for i in ${requirement[@]}; do

		if command -v $i > /dev/null 2>&1; then
			statusmessage+=("%4sFound:%10s$i")
			statusflag+=('0')
		else
			statusmessage+=("%4sMissing:%8s$i")
			statusflag+=('1')
			whattoinstall+=("$i")
			error=1
		fi

	done

	# Display status of presence or not of each requirement

	for LINE in ${statusmessage[@]}; do
		printf "$LINE\n"
	done

	# Check for critical errors and warning errors. Set critical flag if appropriate.

	critical=0

	if test ${statusflag[0]} = 1
	then
		printf "\n%4sWe need the program 'tesseract-ocr' for $title to work.\n"
		critical=1
	fi

	# Display appropriate status messages

	if test "$error" == 0 && test "$critical" == 0; then
		printf "\nThe software environment is optimal for this program.\n"
	fi

	if test "$error" == 1 && test "$critical" == 0; then
		printf "Non essential software required by $title is missing from this system. If $title fails to run, consider to install with, for example,\n\n%6ssudo apt-get install ${whattoinstall[*]}"
	fi

	if test "$critical" == 1; then
		printf  "Critical error" "essential software dependencies are missing from this system. $title will stop here. install missing software with, for example,\n\n%6ssudo apt-get install ${whattoinstall[*]}\n\nthen run $title again."
		read something
		exit 1
	fi

###
#
# Process the PDF Files
#
###


# Locate Where We Are
filepath="$(dirname "$(readlink -f "$0")")"

# A Little precaution
cd "$filepath"

# Extract images from PDFs in the current directory
printf "\nStage 1: Extracting text from Images\n\n"

count=1
for ext in ${inputFormat[@]}
do
	for f in "$filepath"/*.$ext
	do
		if test -f "$f"
		then
			tesseract "$f" "$f.$outputFormat"
			printf "%4s$count) Extracted text from '$f'\n"
			let "count += 1"
		fi
		
	done
done

# Organize the files.. or not

# Update $extensions array
extensions+=("$outputFormat" "$inputFormat")

if test $organize
then
	printf "\nStage 3: $organize files into sub directories\n\n"
	printf "%4s"
	for ext in ${extensions[@]}
	do

		for f in "$filepath"/*.$ext
		do
			if test -f "$f"
			then
				if test ! -d "$filepath/$ext"
				then
					mkdir "$filepath/$ext" # Make sub directory for each extension
				fi
				case $organize in
				
					copy)
						cp "$filepath"/*."$ext" "$filepath/$ext/"
						printf '.'
					;;
					move)
						mv "$filepath"/*."$ext" "$filepath/$ext/"
						printf '.'
					;;
				esac
			fi
		done
	done
fi

printf "\n\nAll Done!\n\n"