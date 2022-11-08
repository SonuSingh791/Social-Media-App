import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../Actions/uploadAction";
import { updateUser } from "../../Actions/userAction";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  // const [password, ...other] = data;
  const [formData, setFormData] = useState(data);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const {user} = useSelector((state) => state.authReducer.authData);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleImageChange = (e) => {
    if(e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      e.target.name === 'profilePicture' ? setProfileImage(img) : setCoverImage(img);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if(profileImage) {
      const data = new FormData();
      const filename = Date.now() + profileImage.name;
      data.append("name", filename);
      data.append("file", profileImage);
      UserData.profilePicture = filename;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    if(coverImage) {
      const data = new FormData();
      const filename = Date.now() + coverImage.name;
      data.append("name", filename);
      data.append("file", coverImage);
      UserData.coverPicture = filename;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(updateUser(params.id, UserData));
    setModalOpened(false);
  }
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="firstName"
            placeholder="First Name"
            onChange = {handleChange}
            value = {formData.firstName}
          />

          <input
            type="text"
            className="infoInput"
            name="lastName"
            placeholder="Last Name"
            onChange = {handleChange}
            value = {formData.lastName}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            onChange = {handleChange}
            value = {formData.worksAt}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesIn"
            placeholder="Lives in"
            onChange = {handleChange}
            value = {formData.livesIn}
          />

          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange = {handleChange}
            value = {formData.country}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="RelationShip Status"
            name = "relationship"
            onChange = {handleChange}
            value = {formData.relationship}
          />
        </div>


        <div>
            Profile Image 
            <input type="file" name='profilePicture' onChange = {handleImageChange}/>
            Cover Image
            <input type="file" name="coverPicture" onChange = {handleImageChange} />
        </div>

        <button className="button infoButton" onClick = {handleSubmit}>Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;