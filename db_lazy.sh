#!/bin/sh

usage(){
	echo -e "Usage : '$0 [arg]' where arg is one of\n- 'c' to clean DB, \n- 'p' to populate DB \n- cp to clean & populate DB";
}

clean_db(){
	echo "[SH] cleaning DB"
	psql postgres < photo_tables.sql
	echo "[SH] DB cleaned"
}

populate_db(){
	echo "[SH] populating DB"
	psql postgres < photo_data.sql
	echo "[SH] DB populated"
}

if [ $# == 1 ]
then
	if [ $1 == "cp" ]
	then
		clean_db
		populate_db
	elif [ $1 == "c" ]
	then
		clean_db
	elif [ $1 == "p" ]
	then
		populate_db
	else
		usage
	fi
else
	echo "unexpected number of arguments (go $#, expected 1)"
	usage
fi

