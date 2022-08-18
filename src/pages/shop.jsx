import React, { Fragment, useEffect, useState } from "react";
import shopService from "../services/shopService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Input from "../controls/input";
import { Button, Container, Modal, Row, Col } from "react-bootstrap";

const Shop = (props) => {
  const [shops, setShops] = useState([]);
  const [cities, setCities] = useState([]);
  const [files, setFiles] = useState(null);
  const [id, setId] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const handleModalClose = () => setModalShow(false);
  const handleModalClose2 = () => setModalShow2(false);

  const handleModalShow = (e, id) => {
    if (e) e.preventDefault();
    setId(id); // update id variable

    if (id > 0) {
      shopService.get(id).then((res) => {
        // set name value for input box
        formik.setValues(res);
        setModalShow2(true);
      });
    } else {
      // set input box to blank
      formik.setValues(shopService.get(0));
      setModalShow(true);
    }
  };

  const handleFormSubmit = (values) => {
    if (values.minPrice >= values.maxPrice)
      toast.error("min price cannot greater than max price");
    else {
      const formData = new FormData();
      if (files != null) files.forEach((it) => formData.append("files", it));
      formData.append("shop", JSON.stringify(values));

      if (id === 0) {
        shopService.add(formData).then((res) => {
          // success message
          toast.success("add shop success");
          // reload data
          loadData();
          // close modal
          handleModalClose();
        });
      } else {
        shopService.update(id, formData).then((res) => {
          // success message
          toast.success("edit shop success");
          // reload data
          loadData();
          // close modal
          handleModalClose2();
        });
      }
    }
  };

  const types = ["Food", "Fashion", "Shoe", "Hotel"];

  const handleTypeSelect = (e) => {
    formik.values.type = e.target[e.target.selectedIndex].text;
  };

  const getShopByType = (e) => {
    if (e.target[e.target.selectedIndex].value != -1) {
      shopService
        .getByType(parseInt(e.target[e.target.selectedIndex].value))
        .then((res) => {
          setShops(res);
        });
    } else loadData();
  };

  const getShopByCity = (e) => {
    if (e.target[e.target.selectedIndex].value != -1) {
      shopService
        .getByCity(e.target[e.target.selectedIndex].text)
        .then((res) => {
          setShops(res);
        });
    } else loadData();
  };

  const onFileChange = (e) => {
    const listFiles = [];
    for (var index = 0; index < e.target.files.length; index++)
      listFiles.push(e.target.files[index]);
    setFiles(listFiles);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      type: 0,
      openTime: "",
      closeTime: "",
      minPrice: 0,
      maxPrice: 0,
      addressDetail: "",
      addressDistrict: "",
      addressCity: "",
      picture1: "",
      picture2: "",
      picture3: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter shop name"),
      openTime: Yup.string().required("Please enter open time"),
      closeTime: Yup.string().required("Please enter close time"),
      addressDetail: Yup.string().required("Please enter address info"),
      addressDistrict: Yup.string().required("Please enter address info"),
      addressCity: Yup.string().required("Please enter address info"),
    }),
    onSubmit: (values) => {
      if (values.type == null) values.type = "Food";
      handleFormSubmit(values);
    },
  });

  const loadData = () => {
    shopService.getAll().then((res) => {
      setShops(res);
    });
    shopService.getCities().then((res) => {
      setCities(res);
    });
  };

  const deleteShop = (e, id) => {
    e.preventDefault();
    shopService.remove(id).then((res) => {
      // show success message
      toast.success("delete shop success");
      // reload data
      loadData();
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Fragment>
      <div className="container-fluid mt-4">
        <div className="card border-primary bt-primary-5">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h3 className="card-title">
                  Shop <small className="text-muted">list</small>
                </h3>
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#editModal"
                  onClick={() => handleModalShow(null, 0)}
                >
                  <i className="fas fa-plus"></i> Add
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <label className="col-md-1">
                <strong>FILTER</strong>
                <i className="fas fa-filter">:</i>
              </label>

              <label className="col-md-1">
                <strong>Type</strong>
              </label>
              <select
                defaultValue=""
                onChange={getShopByType}
                style={{ marginLeft: "-4%" }}
              >
                <option value="-1">--Type--</option>
                {types.map((type, idx) => {
                  return (
                    <option key={idx} value={idx}>
                      {type}
                    </option>
                  );
                })}
              </select>

              <label className="col-md-1 ml-4">
                <strong>City</strong>
              </label>
              <select
                defaultValue={cities[0]}
                onChange={getShopByCity}
                style={{ marginLeft: "-4%" }}
              >
                <option value="-1">--City--</option>
                {cities.map((city, idx) => {
                  return (
                    <option key={idx} value={idx}>
                      {city}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered table-hover table-striped">
                <thead>
                  <tr className="table-primary text-center">
                    <th style={{ width: "50px" }}>#</th>
                    <th>Shop</th>
                    <th>Type</th>
                    <th>Open Time</th>
                    <th>Close Time</th>
                    <th>Min Price</th>
                    <th>Max Price</th>
                    <th>Star</th>
                    <th>Address</th>
                    <th style={{ width: "80px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {shops.map((shop, idx) => {
                    return (
                      <tr key={idx} style={{ textAlign: "center" }}>
                        <td>{idx + 1}</td>
                        <td style={{ textAlign: "left" }}>{shop.name}</td>
                        <td>{shop.type}</td>
                        <td>{shop.openTime}</td>
                        <td>{shop.closeTime}</td>
                        <td style={{ textAlign: "left" }}>{shop.minPrice}</td>
                        <td style={{ textAlign: "left" }}>{shop.maxPrice}</td>
                        <td>{shop.star}</td>
                        <td style={{ textAlign: "left" }}>
                          {shop.addressDetail +
                            "/" +
                            shop.addressDistrict +
                            "/" +
                            shop.addressCity}
                        </td>
                        <td>
                          <a
                            href="/#"
                            onClick={(e) => handleModalShow(e, shop.id)}
                          >
                            <i className="fas fa-edit text-primary"></i>
                          </a>
                          <a href="/#" onClick={(e) => deleteShop(e, shop.id)}>
                            <i className="fas fa-trash-alt text-danger"></i>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Shop</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={formik.handleSubmit}
          method="POST"
          encType="multipart/form-data"
        >
          <Modal.Body>
            <Input
              type="text"
              id="txtName"
              label="Shop Name"
              frmField={formik.getFieldProps("name")}
              err={formik.touched.name && formik.errors.name}
              errMessage={formik.errors.name}
            />

            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Type</label>
              <select
                defaultValue={formik.values.type}
                onChange={handleTypeSelect}
                className="form-select ml-3"
              >
                {types.map((type, idx) => {
                  return (
                    <option
                      key={idx}
                      value={idx}
                      {...formik.getFieldProps("type")}
                    >
                      {type}
                    </option>
                  );
                })}
              </select>
            </div>

            <Input
              type="text"
              id="txtOT"
              label="Open Time"
              frmField={formik.getFieldProps("openTime")}
              err={formik.touched.openTime && formik.errors.openTime}
              errMessage={formik.errors.openTime}
            />
            <Input
              type="text"
              id="txtCT"
              label="Close Time"
              frmField={formik.getFieldProps("closeTime")}
              err={formik.touched.closeTime && formik.errors.closeTime}
              errMessage={formik.errors.closeTime}
            />

            <Input
              type="text"
              id="txtMinPrice"
              label="Min Price"
              frmField={formik.getFieldProps("minPrice")}
              // err={formik.touched.minPrice && formik.errors.minPrice}
              // errMessage={formik.errors.minPrice}
            />
            <Input
              type="text"
              id="txtMaxPrice"
              label="Max Price"
              frmField={formik.getFieldProps("maxPrice")}
              // err={formik.touched.maxPrice && formik.errors.maxPrice}
              // errMessage={formik.errors.maxPrice}
            />
            <Input
              type="text"
              id="txtDetail"
              label="Address Detail"
              frmField={formik.getFieldProps("addressDetail")}
              err={formik.touched.addressDetail && formik.errors.addressDetail}
              errMessage={formik.errors.addressDetail}
            />
            <Input
              type="text"
              id="txtDistrict"
              label="District"
              frmField={formik.getFieldProps("addressDistrict")}
              err={
                formik.touched.addressDistrict && formik.errors.addressDistrict
              }
              errMessage={formik.errors.addressDistrict}
            />
            <Input
              type="text"
              id="txtCity"
              label="City"
              frmField={formik.getFieldProps("addressCity")}
              err={formik.touched.addressCity && formik.errors.addressCity}
              errMessage={formik.errors.addressCity}
            />

            <div>
              <h3>Chose Shop's pictures</h3>
              <div>
                <input type="file" multiple onChange={onFileChange} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* EDIT MODEL */}
      <Modal show={modalShow2} onHide={handleModalClose2} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Shop</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={formik.handleSubmit}
          method="POST"
          encType="multipart/form-data"
        >
          <Modal.Body>
            <Container>
              <Row>
                <Col xs={7} md={5}>
                  <img
                    src={formik.values.picture1}
                    alt=""
                    className="d-block w-100 mb-3"
                  />
                  <img
                    src={formik.values.picture2}
                    alt=""
                    className="d-block w-100 mb-3"
                  />
                  <img
                    src={formik.values.picture3}
                    alt=""
                    className="d-block w-100 mb-3"
                  />
                </Col>
                <Col xs={11} md={7}>
                  <Input
                    type="text"
                    id="txtName"
                    label="Shop Name"
                    frmField={formik.getFieldProps("name")}
                    err={formik.touched.name && formik.errors.name}
                    errMessage={formik.errors.name}
                  />

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Type</label>
                    <select
                      defaultValue={formik.values.type}
                      onChange={handleTypeSelect}
                      className="form-select ml-3"
                    >
                      {types.map((type, idx) => {
                        return (
                          <option
                            key={idx}
                            value={idx}
                            {...formik.getFieldProps("type")}
                          >
                            {type}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <Input
                    type="text"
                    id="txtOT"
                    label="Open Time"
                    frmField={formik.getFieldProps("openTime")}
                    // err={formik.touched.openTime && formik.errors.openTime}
                    // errMessage={formik.errors.openTime}
                  />
                  <Input
                    type="text"
                    id="txtCT"
                    label="Close Time"
                    frmField={formik.getFieldProps("closeTime")}
                    // err={formik.touched.closeTime && formik.errors.closeTime}
                    // errMessage={formik.errors.closeTime}
                  />

                  <Input
                    type="text"
                    id="txtMinPrice"
                    label="Min Price"
                    frmField={formik.getFieldProps("minPrice")}
                    // err={formik.touched.email && formik.errors.email}
                    // errMessage={formik.errors.email}
                  />
                  <Input
                    type="text"
                    id="txtMaxPrice"
                    label="Max Price"
                    frmField={formik.getFieldProps("maxPrice")}
                    // err={formik.touched.phone && formik.errors.phone}
                    // errMessage={formik.errors.phone}
                  />
                  <Input
                    type="text"
                    id="txtDetail"
                    label="Address Detail"
                    frmField={formik.getFieldProps("addressDetail")}
                    // err={formik.touched.addressDetail && formik.errors.addressDetail}
                    // errMessage={formik.errors.addressDetail}
                  />
                  <Input
                    type="text"
                    id="txtDistrict"
                    label="District"
                    frmField={formik.getFieldProps("addressDistrict")}
                    // err={
                    //   formik.touched.addressDistrict && formik.errors.addressDistrict
                    // }
                    // errMessage={formik.errors.addressDistrict}
                  />
                  <Input
                    type="text"
                    id="txtCity"
                    label="City"
                    frmField={formik.getFieldProps("addressCity")}
                    // err={formik.touched.addressCity && formik.errors.addressCity}
                    // errMessage={formik.errors.addressCity}
                  />

                  <div>
                    <h3>Chose Shop's pictures</h3>
                    <div>
                      <input type="file" multiple onChange={onFileChange} />
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose2}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  );
};

export default Shop;
