// import React from 'react';
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBInput,
//   MDBIcon,
//   MDBCheckbox
// } from 'mdb-react-ui-kit';

// function App() {
//   return (
//     <MDBContainer fluid className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
//       <MDBRow className="d-flex justify-content-center align-items-center min-vh-100">
//         <MDBCard className="text-black" style={{ borderRadius: '35px', maxWidth: '700px' }}>
//           <MDBRow className="g-0">
//             {/* Left Side - Form */}
//             <MDBCol md="6" className="order-2 order-lg-1">
//               <MDBCardBody className="p-5 d-flex flex-column justify-content-center">
//                 <h3 className="text-center fw-bold mb-4">Create an Account</h3>

//                 <div className="d-flex flex-row align-items-center mb-4">
//                   <MDBIcon fas icon="user me-3 text-primary" size="lg" />
//                   <MDBInput
//                     label="Your Name"
//                     id="form1"
//                     type="text"
//                     className="w-100"
//                     style={{ borderRadius: '10px' }}
//                   />
//                 </div>

//                 <div className="d-flex flex-row align-items-center mb-4">
//                   <MDBIcon fas icon="envelope me-3 text-primary" size="lg" />
//                   <MDBInput
//                     label="Your Email"
//                     id="form2"
//                     type="email"
//                     className="w-100"
//                     style={{ borderRadius: '10px' }}
//                   />
//                 </div>

//                 <div className="d-flex flex-row align-items-center mb-4">
//                   <MDBIcon fas icon="lock me-3 text-primary" size="lg" />
//                   <MDBInput
//                     label="Password"
//                     id="form3"
//                     type="password"
//                     className="w-100"
//                     style={{ borderRadius: '10px' }}
//                   />
//                 </div>

//                 <div className="d-flex flex-row align-items-center mb-4">
//                   <MDBIcon fas icon="key me-3 text-primary" size="lg" />
//                   <MDBInput
//                     label="Repeat your password"
//                     id="form4"
//                     type="password"
//                     className="w-100"
//                     style={{ borderRadius: '10px' }}
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <MDBCheckbox
//                     name="flexCheck"
//                     value=""
//                     id="flexCheckDefault"
//                     label="I agree to the terms and conditions"
//                   />
//                 </div>

//                 <MDBBtn
//                   className="mb-4 w-100"
//                   size="lg"
//                   style={{
//                     backgroundColor: '#007bff',
//                     fontWeight: 'bold',
//                     borderRadius: '10px',
//                     letterSpacing: '1px'
//                   }}
//                 >
//                   Register
//                 </MDBBtn>

//                 <p className="text-center">
//                   Already have an account? <a href="/login" className="text-primary fw-bold">Login</a>
//                 </p>
//               </MDBCardBody>
//             </MDBCol>

//             {/* Right Side - Image */}
//             <MDBCol
//               md="6"
//               className="order-1 order-lg-2 d-flex align-items-center"
//               style={{ backgroundColor: '#e9f3ff', borderRadius: '0 25px 25px 0' }}
//             >
//               <MDBCardImage
//                 src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
//                 alt="Register illustration"
//                 className="img-fluid"
//                 style={{ borderRadius: '0 25px 25px 0' }}
//               />
//             </MDBCol>
//           </MDBRow>
//         </MDBCard>
//       </MDBRow>
//     </MDBContainer>
//   );
// }

// export default App;


import React, { useState } from 'react';
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit';

function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    preference: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (formData.password !== formData.confirmPassword) {
    //   setError('Passwords do not match');
    //   return;
    // }

    try {
      const response = await axios.post('http://localhost:8083/chitti/register', {
        username: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        preference: formData.preference
      });
      setMessage(response.data); // Display success message
      setError(''); // Clear any existing errors
    } catch (err) {
      setError(err.response?.data || 'Registration failed'); // Display error message
      setMessage('');
    }
  };

  return (
    <MDBContainer fluid className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
      <MDBRow className="d-flex justify-content-center align-items-center min-vh-100">
        <MDBCard className="text-black" style={{ borderRadius: '35px', maxWidth: '700px' }}>
          <MDBRow className="g-0">
            {/* Left Side - Form */}
            <MDBCol md="6" className="order-2 order-lg-1">
              <MDBCardBody className="p-5 d-flex flex-column justify-content-center">
                <h3 className="text-center fw-bold mb-4">Create an Account</h3>

                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="user me-3 text-primary" size="lg" />
                    <MDBInput
                      label="Your Name"
                      id="form1"
                      type="text"
                      name="name"
                      className="w-100"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: '10px' }}
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="envelope me-3 text-primary" size="lg" />
                    <MDBInput
                      label="Your Email"
                      id="form2"
                      type="email"
                      name="email"
                      className="w-100"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: '10px' }}
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3 text-primary" size="lg" />
                    <MDBInput
                      label="Your PhoneNumber"
                      id="form3"
                      type="number"
                      name="phoneNumber"
                      className="w-100"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: '10px' }}
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="key me-3 text-primary" size="lg" />
                    <MDBInput
                      label="Your Preference Male/Female"
                      id="form4"
                      type="text"
                      name="preference"
                      className="w-100"
                      value={formData.preference}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: '10px' }}
                    />
                  </div>

                  <div className="mb-4">
                    <MDBCheckbox
                      name="flexCheck"
                      value=""
                      id="flexCheckDefault"
                      label="I agree to the terms and conditions"
                      required
                    />
                  </div>

                  <MDBBtn
                    className="mb-4 w-100"
                    size="lg"
                    style={{
                      backgroundColor: '#007bff',
                      fontWeight: 'bold',
                      borderRadius: '10px',
                      letterSpacing: '1px'
                    }}
                  >
                    Register
                  </MDBBtn>
                </form>

                <p className="text-center">
                  Already have an account? <a href="/login" className="text-primary fw-bold">Login</a>
                </p>
              </MDBCardBody>
            </MDBCol>

            {/* Right Side - Image */}
            <MDBCol
              md="6"
              className="order-1 order-lg-2 d-flex align-items-center"
              style={{ backgroundColor: '#e9f3ff', borderRadius: '0 25px 25px 0' }}
            >
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                alt="Register illustration"
                className="img-fluid"
                style={{ borderRadius: '0 25px 25px 0' }}
              />
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBRow>
    </MDBContainer>
  );
}

export default Registration;
