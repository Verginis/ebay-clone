import React, { useState, useEffect } from 'react'
import axios from "../api/axios";
import ReactPaginate from 'react-paginate';
import '../styles/items.scss';

const Items = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage] = useState(20);
  
    useEffect(() => {
      const fetchPosts = async () => {
        setLoading(true);
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(res.data);
        setLoading(false);
      };
  
      fetchPosts();
    }, []);
  
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost + postsPerPage;
   // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
    // Change page
    //const paginate = pageNumber => setCurrentPage(pageNumber);

    const displayPosts = posts
    .slice(indexOfLastPost, indexOfFirstPost )
    .map((post) => {
      return(
        <div key={post.id} className='list-group-item'>
          {post.title}
        </div>
        );
    });

    if (loading) {
        return <h2>Loading...</h2>;
      }
      
      const pageCount = Math.ceil(posts.length / postsPerPage);

      const changePage = ({selected}) => {
        setCurrentPage(selected);
      };

      return (
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
      );
}

export default Items