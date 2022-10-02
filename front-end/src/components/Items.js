import React, { useState, useEffect } from 'react'
import axios from "../api/axios";
import { Link} from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import '../styles/items.scss';

const Items = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage] = useState(20);


    const [searchField, setSearchField] = useState("");
    const [options, setoptions] = useState("category");
  
    useEffect(() => {
      const fetchPosts = async () => {
        setLoading(true);
        const res = await axios.get('/api/v1/items');
        setPosts(res.data);
        console.log(res.data);
        setLoading(false);
      };
  
      fetchPosts();
    }, []);


    const handleSearch = async () => {
      console.log(options, searchField);

      // useEffect(() => {
      //   const fetchItems = async () => {
      //     setLoading(true);
      //     const res = await axios.get('/api/v1/search?'+options+'='+searchField);
      //     setPosts(res.data);
      //     console.log(res.data);
      //     setLoading(false);
      //   };
    
      //   fetchItems();
      // }, []);
      
      try {
        // console.log('yeaaah')
         const response = await axios.post('/api/v1/search?'+options+'='+searchField,
             {
                 headers: { 'Content-Type': 'application/json' },
                 withCredentials: true
             }
         );
         console.log("aaaaaaaaaa");
         //console.log(response?.data);
         //console.log(response?.accessToken);
         //console.log(JSON.stringify(response))
         //setSuccess(true);
         //clear state and controlled inputs
         //need value attrib on inputs for this
        //  setmake_bid('');

     } catch (err) {
      console.log("eeeaaaaaaaaaa");
        //  if (!err?.response) {
        //      setErrMsg('No Server Response');
        //  } else if (err.response?.status === 409) {
        //      setErrMsg('Username Taken');
        //  } else {
        //      setErrMsg('Registration Failed')
        //  }
     }
    }
  
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost + postsPerPage;
   // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
    // Change page
    //const paginate = pageNumber => setCurrentPage(pageNumber);

    const displayPosts = posts
    .slice(indexOfLastPost, indexOfFirstPost )
    .length
    ? (
      <div className="auct-list">
        {posts.map(({name, i, id, description,category, country, location, buy_price, current_bid, latitude, longitude, ended}) => {
          return(
            <div key={id} className='auction-details-container'>
              
              <Link to={'/products/bid'} state={{name, id, category, description, country, location, buy_price, current_bid, latitude, longitude, ended}}><h2>{name}</h2></Link>
              

              <div className="categories-wrapper">
                <h4>Categories: </h4>
                
                <h5>{category[0]}</h5>
                <h5>{category[1]}</h5>
                <h5>{category[2]}</h5>
                <h5>{category[3]}</h5>
              </div>
              
              <p>Description: {description}</p>
              
              <div className="wrapper-2">
                <span>Country: {country}</span>
                <span>Location: {location}</span>
              </div>

              <div className="wrapper-2">
                <span>Buy Price: {buy_price}</span>
                <span>Current Bid: {current_bid}</span>
              </div>


              
              

            </div>
          );
          })}
    </div>
    ) : <p>No users to display</p>;

    if (loading) {
        return <h2>Loading...</h2>;
      }
      
      const pageCount = Math.ceil(posts.length / postsPerPage);

      const changePage = ({selected}) => {
        setCurrentPage(selected);
      };

      return (
        <>        
                  <div>
                    <select onChange={(e) => setoptions(e.target.value)}>
                      <option selected value="category">Categories</option>
                      <option value="price">Max Price</option>
                      <option value="location">Location</option>
                      <option value="text">Description</option>
                    </select>
                        <input
                                type="text"
                                id="searchField"
                                autoComplete="on"
                                onChange={(e) => setSearchField(e.target.value)}
                                value={searchField}
                                required


                            />
                        <button className='anim-btn' onClick={handleSearch} >Search</button>
                  </div>
                 <div className='products-section'>
                {displayPosts}
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBtns"}
                  previousLinkClassName={"prevBtn"}
                  nextLinkClassName={"nextBtn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                />
              </div>
        
        </>
      );
}

export default Items