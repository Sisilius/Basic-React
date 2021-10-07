import React, { useEffect, useState } from "react";
// import Counter from './components/Counter'
import Postlist from '../components/Postlist'
import PostForm from "../components/PostForm";
import Postfilter from "../components/Postfilter";
// import MySelect from './components/UI/select/MySelect'
import MyButton from '../components/UI/button/MyButton'
// import MyInput from './components/UI/input/MyInput'
import Pagination from '../components/UI/pagination/Pagination'
import MyModal from '../components/UI/MyModal/MyModal'
import Loader from '../components/UI/Loader/Loader'
import '../styles/app.css';
import { usePosts } from "../components/hooks/usePosts";
import axios from "axios";
import PostService from "../API/PostService";
import { useFetching } from "../components/hooks/useFetching";
import { getPageCount, getPagesArray } from '../utils/pages'

function Posts() {
  const [posts, setPosts] = useState([]);  
  const [filter, setFilter] = useState({sort: '', query:''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [totalPages, settotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    settotalPages(getPageCount(totalCount, limit))
  })

  useEffect (() => {
    fetchPosts()
  }, [page])

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">
      <button onClick={fetchPosts}>get posts</button>
        <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
            Создать пост
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost}/>
        </MyModal>
        <hr style={{margin: '15px 0'}} />
        <Postfilter
          filter={filter}
          setFilter={setFilter}
        />

        {isPostsLoading
        ? <div style={{display: "flex", justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
        : <Postlist remove={removePost} posts={sortedAndSearchedPosts} title="Список постов" />
          }
          <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
