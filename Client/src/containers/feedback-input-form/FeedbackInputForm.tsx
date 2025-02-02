import React from "react";
import { Input, Avatar, Dropdown, Menu, Button, Space, MenuProps } from "antd";
import "./FeedbackInputForm.css";
import CustomButton from "../../components/custom-button/CustomButton";
import Upload from "antd/es/upload/Upload";
import { DownOutlined, PictureOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const FeedbackInputForm: React.FC = () => {
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    // message.info('Click on menu item.');
    console.log("click", e);
  };

  const items: MenuProps["items"] = [
    {
      label: "Feedback",
      key: "1",
    },
    {
      label: "Bug report",
      key: "2",
    },
    {
      label: "Feature request",
      key: "3",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="review-input-form">
      <div className="form-header">
        <Avatar
          size={50}
          src="https://via.placeholder.com/50"
          alt="User Profile"
          className="user-avatar"
        />
        <span className="user-name">John Doe</span>
      </div>
      <TextArea
        placeholder="Add your review here"
        autoSize={{ minRows: 4 }}
        className="review-textarea"
      />
      <div className="form-footer">
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture"
          // defaultFileList={fileList}
        >
          <Button type="default" icon={<PictureOutlined />}>
            Add Media
          </Button>
        </Upload>
        {/* <Dropdown overlay={menu}>
          <CustomButton>
            Add Category <i className="fa fa-caret-down" />
          </CustomButton>
        </Dropdown> */}
        <Dropdown menu={menuProps}>
          <Button>
            {/* <Space> */}
            Add Category
            <DownOutlined />
            {/* </Space> */}
          </Button>
        </Dropdown>
        <CustomButton
          type="primary"
          customStyle={{
            backgroundColor: "#ff00ff",
            color: "#fff",
            float: "right",
          }}
        >
          Post
        </CustomButton>
      </div>
    </div>
  );
};

export default FeedbackInputForm;
