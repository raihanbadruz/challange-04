//import useState dan useEffect
import { useState, useEffect } from "react";

//import api
// import api from "../../api";

//import Link
import { Link } from "react-router-dom";

export default function PostIndex() {
  //ini state
  const [posts, setPosts] = useState([]);

  //define method

  const fetchAPI = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
      const data = await response.json(); //mengurai data json dari response
      setPosts(data.abilities);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //run hook useEffect
  useEffect(() => {
    //call method "fetchDataPosts"
    fetchAPI();
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-12">
          <Link
            to="/posts/create"
            className="btn btn-md btn-success rounded shadow border-0 mb-3"
          >
            ADD NEW POST
          </Link>
          <div className="card border-0 rounded shadow">
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="bg-dark text-white">
                  <tr>
                    <th scope="col">name</th>
                    <th scope="col">url</th>
                    <th scope="col">is_hidden</th>
                    <th scope="col">slot</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.length > 0 ? (
                    posts.map((post, index) => (
                      <tr key={index}>
                        <td>{post.ability.name}</td>
                        <td>{post.ability.url}</td>
                        <td>{post.is_hidden}</td>
                        <td>{post.slot}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        <div className="alert alert-danger mb-0">
                          Data Belum Tersedia!
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
