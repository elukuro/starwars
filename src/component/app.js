import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

class App extends Component{
	constructor(props){
		super(props);
		this.state={
			data:{},
			movie:[],
			loading:true
		}
	}

	componentDidMount(){
		axios.get('https://swapi.co/api/people/?format=json').then((response)=> {
  			this.setState({data:response.data['results'][0]});
				// get url data
				return _.map(this.state.data.films,item=>{
					axios.get(item).then((response)=> {
						 this.setState({movie: this.state.movie.concat(response.data),loading:false})
						 console.log(response.data);
					})
				})

		 })
	}


	renderMovie(){
			return _.map(this.state.movie.slice(0, 4),(item,key)=>
					{
						return(
							<li className="movie__item" key={item.title}>
									<div className="movie-video">
										<i className="fa fa-play-circle-o"></i>
									</div>
									<div className="movie-description">
										<h5>{item.title}</h5>
										<label>Director:</label>
										<p>{item.director}</p>
										<label>Release:</label>
										<p>{item.release_date}</p>
									</div>
							</li>
						)
				}
			)
	}

	renderAnother(){
		return _.map(this.state.movie.slice(4, 5),(item,key)=>
				{
					return(
						<div className="profile-related" key={item.title}>
							<div className="profile-related-title">
								<h5>{item.title}</h5>
								<p><span className="related-data">Director:</span> <span className="related-value">{item.director}</span></p>
								<p><span className="related-data">Producer:</span> <span className="related-value">{item.producer}</span></p>
								<p><span className="related-data">Release Date:</span> <span className="related-value">2015-12-11</span></p>
							</div>
							<div className="profile-repated-description">
								<p>{item.opening_crawl}</p>
								<a href="#" className="related-link">See More</a>
							</div>
						</div>
					)
			}
		)
	}

	renderProfile(){
			return(
				<div>
					<div className="profile__name">
						<h1>{this.state.data.name}</h1>
					</div>
					<div className="profile__data">
							<figure className="profile__avatar">
									<i className="fa fa-user-o"></i>
							</figure>
							<div className="profile__info">
								<p><span className="info-data">Height:</span> <span className="info-value">{this.state.data.height} cm</span></p>
								<p><span className="info-data">Mass:</span> <span className="info-value">{this.state.data.mass}</span></p>
								<p><span className="info-data">Hair Color:</span> <span className="info-value">{this.state.data.hair_color}</span></p>
								<p><span className="info-data">Skin Color:</span> <span className="info-value">{this.state.data.skin_color}</span></p>
								<p><span className="info-data">Birth Year:</span> <span className="info-value">{this.state.data.birth_year}</span></p>
								<p><span className="info-data">Gender:</span> <span className="info-value">{this.state.data.gender}</span></p>
							</div>
					</div>
				</div>
			)
	}

	render(){
		if(this.state.loading){
			return(
				<div className="loading">
				<div className="loading-wrapper">
					<h1>loading...</h1>
				</div>
				</div>
			)
		}else{
			return(
				<div>
					<div className="wrapper">
						<div className="profile">
							{this.renderProfile()}
							<div className="profile__movie">
								<div className="profile__movie-list">
									<div className="profile__movie-list-header">
										<h4>Skywalker Movies</h4>
										<a href="#">See More</a>
									</div>
									<ul className="profile__movie-item">
										{this.renderMovie()}
									</ul>
								</div>
								<div className="profile__movie-related">
								<h4>Related Another Movies</h4>
									{this.renderAnother()}
								</div>
							</div>
						</div>
				</div>
			</div>
			)
		}
	}
}

export default App;
