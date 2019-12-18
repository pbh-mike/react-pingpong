import React, {Component} from 'react';

export default function Error({error}){
	return (
		<div className="text-red-700">
			{error}
		</div>
	);
}