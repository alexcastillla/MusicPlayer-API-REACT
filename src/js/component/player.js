import React, { useState, useEffect } from "react";

let API = "https://assets.breatheco.de/apis/sound/songs";

export default function Player() {
	let [songs, setSongs] = useState([]);
	let [url, setUrl] = useState(null);
	let [onPlay, setOnPlay] = useState(false);
	let player = document.querySelector("#player");

	useEffect(() => {
		fetch(API)
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(function(responseAsJson) {
				setSongs(responseAsJson);
				console.log(responseAsJson);
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}, []);

	const playStop = () => {
		if (onPlay) {
			player.pause();
			setOnPlay(false);
		} else {
			player.load();
			player.play();
			setOnPlay(true);
		}
	};

	const next = () => {
		for (let index = 0; index < songs.length; index++) {
			if (
				"https://assets.breatheco.de/apis/sound/" + songs[index].url ==
				url
			) {
				setUrl(
					"https://assets.breatheco.de/apis/sound/" +
						songs[index + 1].url
				);
				player.load();
				player.play();
				setOnPlay(true);
			}
		}
	};

	const previous = () => {
		for (let index = 0; index < songs.length; index++) {
			if (
				"https://assets.breatheco.de/apis/sound/" + songs[index].url ==
				url
			) {
				setUrl(
					"https://assets.breatheco.de/apis/sound/" +
						songs[index - 1].url
				);
				player.load();
				player.play();
				setOnPlay(true);
			}
		}
	};

	return (
		<div className="container">
			<div>
				<p>Playlist imported</p>
			</div>
			<div className="row">
				<ul>
					{songs.map(song => {
						return (
							<li
								key={song.url}
								onClick={() => {
									setUrl(
										"https://assets.breatheco.de/apis/sound/" +
											song.url
									);
									player.load();
									setOnPlay(true);
									player.play();
								}}>
								<span>{song.name}</span>
							</li>
						);
					})}
				</ul>
			</div>
			<div className="container-footer">
				<button
					onClick={() => {
						previous();
					}}>
					<i className="fa fa-backward" />
				</button>
				<button
					onClick={() => {
						playStop();
					}}>
					<i className="fa fa-pause" />
				</button>
				<button
					onClick={() => {
						playStop();
					}}>
					<i className="fa fa-play" />
				</button>
				<button
					onClick={() => {
						next();
					}}>
					<i className="fa fa-forward" />
				</button>
			</div>
			<div>
				<audio id="player">
					<source src={url} type="audio/mpeg" />
				</audio>
			</div>
		</div>
	);
}
