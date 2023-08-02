import React, { useState, useRef } from "react";
import Popup from "reactjs-popup";
import { BiPen } from "react-icons/bi";


import './App.css';
import SignaturePad from "react-signature-canvas";
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./sigCanvas.css";
import * as htmlToImage from 'html-to-image';


function App() {

  function dlpng() {
    htmlToImage.toJpeg(document.getElementById('my-node'), {
      style: { background: "white" },
    })
      .then(function (dataUrl) {
        var img = new Image();
        img.width = 750;
        img.src = dataUrl;
        document.getElementById('result').appendChild(img);

        var a = document.createElement('a')
        a.className = "a btn_valid"
        a.text = "Télécharger"
        a.href = dataUrl
        a.download = "fiche_d'inscription"
        document.getElementById('download').appendChild(a)

      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }

  const [imageURL, setImageURL] = useState(null);

  const sigCanvas = useRef({});

  const clear = () => sigCanvas.current.clear();

  const save = () =>
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));

  return (
    <div className="App">
      <div id="my-node" class="signature-card">
        <div class="legal-clause">
          <div className="font-text">
            Conformément au règlement européen 2016/679 du parlement européen et du conseil du 27 avril 2016, relatif à la protection des
            personnes physiques à l’égard du traitement des données à caractère personnel et à la libre circulation des données, le CFP02 dispose de moyens informatiques
            destinés à répondre à ses obligations réglementaires et juridiques en tant qu’organisme de formation. Les données personnelles collectées et enregistrées
            sont réservées à l’usage exclusif du CFP02 et ne sont communiquées à aucun tiers.<br></br><br></br>
            Je soussigné(e), <input type="text" id="name" name="name" required size="30"></input>&nbsp;
            déclare  avoir  pris connaissance des modalités de collecte et de traitement de mes données personnelles.<br></br><br></br>
            J’autorise le CFP02 à les exploiter pour répondre à ses obligations réglementaires et juridiques en tant qu’organisme de formation dans les conditions
            citées ci-dessus.  <br></br> <br></br></div>
          <Row>
            <Col>
              <span className='doneas font-text'>Fait à LAON, le  <input type="date" id="date" name="date" required size="10"></input>&nbsp; <br></br>
                {imageURL ? (
                  <>
                    <p> <br /><div className="font-text"> Signé électroniquement : <br /> {'CFP02-' + imageURL.substring(47, 70)} </div></p>
                  </>
                ) : null}
              </span> <br></br>
            </Col>
            <Col>
            </Col>
            <Col>          <div className="font-text">
              Signature, précédée de la mention « Lu et approuvé.</div>
              <input type="text" id="approuved" name="approuved" required size="30"></input>&nbsp;
              {imageURL ? (
                <>
                  <br /> <br />
                  <img src={imageURL} alt="my signature" style={{ display: "block", margin: "-50px auto", maxWidth: "90px" }}

                  />
                </>
              ) : <> <br></br>
                <Popup
                  modal
                  trigger={<Button style={{ marginTop: '15px' }}>SIGNER <BiPen /></Button>}
                  closeOnDocumentClick={false} >
                  {close => (
                    <>
                      <SignaturePad ref={sigCanvas} canvasProps={{ className: "signatureCanvas" }}
                      />
                      <Button style={{marginRight: '180px'}} variant="success" onClick={() => {
                        save();
                        dlpng();
                      }}>ENREGISTER</Button>
                      <Button style={{marginRight: '35px'}} variant="danger" onClick={clear}>EFFACER</Button>
                      <Button variant="secondary" onClick={close}>FERMER</Button>
                    </>
                  )}
                </Popup></>}
            </Col>
          </Row>
        </div>
      </div>
      <div style={{ display: 'none' }} id="result"></div>
      <div id="download"></div>
    </div>
  );
}

export default App;
