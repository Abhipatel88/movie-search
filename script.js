const searchForm= document.querySelector("#btn")
const mc =document.querySelector("#mc")
const inp=document.querySelector("#searchbar")
// const md=document.querySelector("#md")


// FUNCTION SHOW MOVIE DATA 
let showMovieData= (data)=>{
    mc.innerHTML=""

    //use destructuring assiment to extract properties from data object
    const {Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster} =data

    const movieElement=document.createElement('div')
    movieElement.classList.add('movie-info')

    movieElement.innerHTML=`<h2>${Title}</h2>
                             <p><strong>Rateing :&#11088</strong>${imdbRating}</p>`
    const movieGenreElement =document.createElement('div')                         
    movieGenreElement.classList.add('movie-genre')
    Genre.split(",").forEach(element => {
        const p =document.createElement('p')
        p.innerHTML=element
        movieGenreElement.appendChild(p)
    })

    movieElement.appendChild(movieGenreElement)

    movieElement.innerHTML +=`<p><strong>Released:</strong>${Released}</p>
                             <p><strong>Duration:</strong>${Runtime}</p>
                             <p><strong>Cast:</strong>${Actors}</p>
                             <p><strong>Plot:</strong>${Plot}</p>`


    // CREATEING DIV FOR MOVIE POSTER
    const moviePosterElement =document.createElement("div")                         
    moviePosterElement.classList.add('movie-poster')
    moviePosterElement.innerHTML=`<img src="${Poster}"/>`

    mc.appendChild(moviePosterElement)
    mc.appendChild(movieElement)


}

//FUNCTION TO FEATCH MOVIE DETAIL USING OMDB API
const getMovieInfo = async (movie)=>{
    try{

        const myApiKey="f0c0180"
        const url =`http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`
        const response = await fetch(url);
        const data =await response.json();
        // console.log(data)
        showMovieData(data)
    }catch(e){
        // let r=console.log("no movie found")
        mc.innerHTML=`<h1>No movie found</h1>`
    }

}





searchForm.addEventListener("click",(event)=>{
    event.preventDefault()
   const movieName =inp.value.trim();
   if(movieName!= ""){
    getMovieInfo(movieName);
   }
   else{
    mc.innerHTML=`<h1>Enter Movie Name to GET Movie Details</h2>`
   }
})


