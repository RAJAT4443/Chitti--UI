// import React, { useState } from 'react';

// const CallInteraction = () => {
//   const [callState, setCallState] = useState('Awaiting Call...');
//   const [messageSummary, setMessageSummary] = useState('');

//   const simulateCall = () => {
//     setCallState('Active Call...');
//     setTimeout(() => {
//       setMessageSummary('Caller mentioned an issue with their order delivery.');
//       setCallState('Call Completed');
//     }, 3000); // Simulate a 3-second call
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Call Interaction</h2>
//       <p>Status: {callState}</p>
//       {callState === 'Awaiting Call...' && (
//         <button className="btn btn-primary" onClick={simulateCall}>
//           Simulate Call
//         </button>
//       )}
//       {messageSummary && (
//         <div className="mt-4">
//           <h4>Message Summary:</h4>
//           <p>{messageSummary}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CallInteraction;




import React, { useState, useRef } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';

function CallInteraction() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [responseAudio, setResponseAudio] = useState(null);
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const handleStartRecording = async () => {
    setMessage('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunks.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      setMessage('Failed to access microphone. Please check your permissions.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = async () => {
    if (!audioURL) {
      setMessage('Please record an audio file before submitting.');
      return;
    }

    setIsProcessing(true);
    setMessage('');

    try {
      // Convert audio blob to file
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recorded-audio.wav');

      // Send the file to the backend (replace with actual API endpoint)
      const response = await fetch('http://localhost:8083/chitti/api/process-audio', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.log(response,response.status);
        throw new Error('Error processing audio');
      }

      const blob = await response.blob();
      const outputAudioUrl = URL.createObjectURL(blob);

      setResponseAudio(outputAudioUrl); // Set the generated audio file
      setMessage('Audio processed successfully!');
    } catch (error) {
      setMessage('Failed to process audio. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <MDBContainer
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#f8f9fa' }}
    >
      <MDBCard className="text-black" style={{ borderRadius: '25px', maxWidth: '700px', width: '100%' }}>
        <MDBRow className="g-0">
          {/* Left Side - Interaction */}
          <MDBCol md="6" className="order-2 order-lg-1">
            <MDBCardBody className="p-5 d-flex flex-column justify-content-center">
              <h3 className="text-center fw-bold mb-4">Call Interaction</h3>

              {message && <div className="alert alert-info">{message}</div>}

              <div className="d-flex justify-content-center mb-4">
                {isRecording ? (
                  <MDBBtn color="danger" onClick={handleStopRecording}>
                    <MDBIcon fas icon="stop" className="me-2" />
                    Stop Recording
                  </MDBBtn>
                ) : (
                  <MDBBtn color="primary" onClick={handleStartRecording}>
                    <MDBIcon fas icon="microphone" className="me-2" />
                    Start Recording
                  </MDBBtn>
                )}
              </div>

              {audioURL && (
                <div className="text-center mt-3">
                  <h5>Recorded Audio:</h5>
                  <audio controls src={audioURL} className="w-100"></audio>
                </div>
              )}

              <MDBBtn
                className="w-100 mt-4"
                size="lg"
                disabled={isProcessing || !audioURL}
                onClick={handleSubmit}
                style={{
                  backgroundColor: '#007bff',
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  letterSpacing: '1px',
                }}
              >
                {isProcessing ? 'Processing...' : 'Submit Audio'}
              </MDBBtn>

              {responseAudio && (
                <div className="text-center mt-4">
                  <h5>Generated Output Audio:</h5>
                  <audio controls src={responseAudio} className="w-100"></audio>
                  <MDBBtn
                    href={responseAudio}
                    download="response-audio.mp3"
                    className="mt-3"
                    style={{
                      backgroundColor: '#28a745',
                      fontWeight: 'bold',
                      borderRadius: '10px',
                      letterSpacing: '1px',
                    }}
                  >
                    Download Audio
                  </MDBBtn>
                </div>
              )}
            </MDBCardBody>
          </MDBCol>

          {/* Right Side - Illustration */}
          <MDBCol
            md="6"
            className="order-1 order-lg-2 d-flex align-items-center"
            style={{ backgroundColor: '#e9f3ff', borderRadius: '0 25px 25px 0' }}
          >
            <MDBCardImage
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw3.webp"
              alt="Call Interaction Illustration"
              className="img-fluid"
              style={{ borderRadius: '0 25px 25px 0' }}
            />
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default CallInteraction;
