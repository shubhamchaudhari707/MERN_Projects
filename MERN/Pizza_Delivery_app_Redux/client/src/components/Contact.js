import React from "react";
import { Container, Row, Col, Table, Image } from "react-bootstrap";
import {BiPhoneCall} from 'react-icons/bi';
import {HiOutlineDevicePhoneMobile} from 'react-icons/hi2';
import {MdOutlineEmail} from 'react-icons/md';

const Contact = () => {
  return (
    <>
      <Container style={{ marginTop: "50px" }}>
        <Row>
          <Col md={6}>
            <h1>PrasanGI Pizza Shop</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              saepe odit quasi animi pariatur sapiente itaque at nostrum atque
              non voluptatum necessitatibus et explicabo inventore repudiandae
              recusandae in repellat, quaerat ducimus aliquid. Quaerat
              blanditiis modi commodi amet, pariatur deleniti, illo ut corrupti
              soluta placeat rerum minima culpa ipsam natus hic nihil quisquam
              provident aliquam vitae error aliquid quia voluptatem? Veniam quae
              recusandae facere itaque odit voluptatem, obcaecati magnam commodi
              cumque corporis hic, dolore fugiat dolores maxime, neque numquam
              quod maiores autem rem et ipsam. Saepe velit ea, quibusdam nobis
              reprehenderit, blanditiis alias dolorum maxime sequi iste modi, ab
              animi distinctio fuga debitis aut labore consequuntur quas
              ducimus. Rem dolor fugiat, necessitatibus tempora vitae omnis
              voluptatem facilis illo, placeat harum deleniti optio consequatur
              nam ratione enim sequi sapiente accusantium ipsum vero cum
              architecto. Magnam, et blanditiis laboriosam voluptates, nisi
              dolore officia quidem, tenetur ab veritatis suscipit
              exercitationem iste aspernatur nobis sapiente? Rerum sint soluta
              aut ex at ullam odit tenetur provident, sapiente laborum? Eaque
              quidem odio exercitationem eligendi totam unde aliquid nam
              obcaecati maiores et. Consequatur non necessitatibus molestiae
              delectus velit ut et distinctio obcaecati esse voluptatibus iste,
              odio minima odit voluptatum dolores minus est sed. Necessitatibus
              nesciunt at consequuntur laborum.
            </p>

            <Table striped bordered hover className="text-center">
              <thead>
                <tr>
                  <th className="bg-warning text-center" colSpan={3}> --- Contact Details ---</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> <BiPhoneCall/> </td>
                  <td>Phone</td>
                  <td>0123-456789</td>
                </tr>

                <tr>
                  <td> <HiOutlineDevicePhoneMobile/> </td>
                  <td>Call</td>
                  <td>912345678</td>
                </tr>

                <tr>
                  <td> <MdOutlineEmail/> </td>
                  <td>Email</td>
                  <td>prasangi@pizzshop.com</td>
                </tr>
                
              </tbody>
            </Table>
          </Col>

            <Col md={6}>
                <Image src="images/farmhouse.jpg" style={{width:"100%", height:"60%"}}/>
            </Col>


        </Row>
      </Container>
    </>
  );
};

export default Contact;
