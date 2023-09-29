//import useState
import { useState } from "react";

//import API
import api from "../../api";

//import useNavigate
import { useNavigate } from "react-router-dom";

export default function PostCreate() {
  //define state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  //state validation
  const [errors, setErrors] = useState([]);

  //useNavigate
  const navigate = useNavigate();

  //method store post
  const storePost = async (e) => {
    e.preventDefault();

    // Buat objek JSON dengan data yang ingin Anda kirim.
    const postData = {
      name: name,
      email: email,
      gender: gender,
    };

    try {
      const response = await fetch(
        "https://cron.eternityinvitation.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData), // Kirim objek JSON, bukan formData
        }
      );

      if (response.ok) {
        // Redirect hanya jika permintaan berhasil (status code 2xx)
        navigate("/posts");
      } else {
        // Tangani kesalahan jika status code bukan 2xx
        const errorData = await response.json();
        setErrors(errorData);
      }
    } catch (error) {
      // Tangani kesalahan jaringan atau kesalahan lainnya di sini
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow">
            <div className="card-body">
              <form onSubmit={storePost}>
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
