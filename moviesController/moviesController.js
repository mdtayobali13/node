const fs = require('fs');
let Movies = JSON.parse(fs.readFileSync("./data/movies.json"))


exports.checkId = (req,res,next, valu)=>{
    console.log('Movie ID is ' + valu);

      let movies =   Movies.find(el => el.id === valu * 1)

      if(!movies){
    return res.status(404).json({
        status : 'Fail', 
        message : "Movie with ID " + valu + " is not found"
     })
  }
  next();
}


exports.valideteBody = (req,res,next)=>{
    if(!req.body.title || !req.body.releaseYear){
        return res.status(400).json({
            status : 'Fail',
            message : "Not a valied movi data"
        })
    }
    next()
}


 exports.getAllMovies = (req , res) => {
   res.status(200).json({
    status : "Success",
    requestedAt : req.requestedAt,
    count: Movies.length,
    data : {
        Movies:Movies
    }
   })
   
}


exports.postMoves = (req,res) => {
 
    const newId = Movies[Movies.length - 1].id + 1;

    const newMoview = Object.assign({id:newId} ,  req.body);

   Movies.push(newMoview);

    fs.readFile("./data/movies.json" , (er)=>{
        res.status(201).json({
            status:'Success',
            data:{
                Movies : Movies
            }
        })
    })
}

 exports.getAllMoviesById = (req , res) =>{
    // console.log(req.params)
    const id = req.params.id * 1;
  let movies =   Movies.find(el => el.id === id)

//   if(!movies){
//     return res.status(404).json({
//         status : 'Fail',
//         message : "Movie with ID" + id + "is not found"
//      })
//   }

    res.status(200).json({
       status : "Success",
       data : {
        movies : movies
       }
    })
}

exports.patchElementById = (req, res) => {
    let id = req.params.id * 1;
    let movieToUpdate = Movies.find(el => el.id === id);

    // if (!movieToUpdate) {
    //     return res.status(404).json({
    //         status: 'Fail',
    //         message: "Movie with ID " + id + " is not found"
    //     });
    // }

    let index = Movies.indexOf(movieToUpdate);

    // Update the movie with the new data
    Object.assign(movieToUpdate, req.body);

    // Replace the old movie with the updated one in the Movies array
    Movies[index] = movieToUpdate;

    // Write the updated Movies array back to the file
    fs.writeFile('./data/movies.json', JSON.stringify(Movies), (err) => {
        if (err) {
            return res.status(500).json({
                status: 'Fail',
                message: 'Error writing to file',
            });
        }

        res.status(200).json({
            status: 'Success',
            data: {
                movie: movieToUpdate
            }
        });
    });
}
//delete Mathod
exports.deleteElementById =  (req , res)=>{
    const id = req.params.id * 1;
    const movieToDelete = Movies.find( el => el.id === id );

    // if(!movieToDelete){
    //     return res.status(404).json({
    //         status : "Fail",
    //         message : "No Movie Object with Id " + id + " is found"
    //     })
    // }

    const index = Movies.indexOf(movieToDelete);

    Movies.splice(index , 1);


    fs.writeFile("./data/movies.json" , JSON.stringify(Movies) , (err)=>{
        res.status(204).json({
            status : 'success',
            data : {
                movie : null
            }
        })
    })

}
