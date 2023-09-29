//import useState
import { useState, useEffect } from "react";

//import useNavigate
import { useNavigate, useParams } from "react-router-dom";

//import API
import api from "../../api";

export default function PostEdit() {
  //define state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  //state validation
  const [errors, setErrors] = useState([]);

  //useNavigate
  const navigate = useNavigate();

  //destruct ID
  const { id } = useParams();

  //method fetchDetailPost
  const fetchAPI = async () => {
    try {
      const response = await fetch(
        `https://cron.eternityinvitation.com/users/${id}`
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //run hook useEffect
  useEffect(() => {
    //call method "fetchDataPosts"
    fetchAPI();
  }, []);

  //method update post
  const updatePost = async (e) => {
    e.preventDefault();

    // Buat objek JSON dengan data yang ingin dikirim.
    const postData = {
      name: name,
      email: email,
      gender: gender,
    };

    try {
      const response = await fetch(
        `https://cron.eternityinvitation.com/users/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        // Redirect kedepan
        navigate("/posts");
      } else {
        // Tangani kesalahan
        const errorData = await response.json();
        setErrors(errorData);
      }
    } catch (error) {
      // Tangani kesalahan kesalahan lainnya
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow">
            <div className="card-body">
              <form onSubmit={updatePost}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Input Name"
                  />
                  {errors.name && (
                    <div className="alert alert-danger mt-2">
                      {errors.name[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                  />
                  {errors.email && (
                    <div className="alert alert-danger mt-2">
                      {errors.email[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Gender</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setGender(e.target.value)}
                    placeholder="Set Gender"
                  />
                  {errors.gender && (
                    <div className="alert alert-danger mt-2">
                      {errors.gender[0]}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-md btn-primary rounded-sm shadow border-0"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
