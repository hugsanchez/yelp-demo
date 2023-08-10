import React from "react"; 

const AddReview = () => {
  return  (
    <div className="mb-2">
      <form action="">
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input id="name" placeholder="name" type="text" className="form-control" />
          </div>
        </div>
      </form>
    </div>
  )
};

export default AddReview;