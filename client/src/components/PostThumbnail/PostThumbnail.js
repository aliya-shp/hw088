import React from 'react';

import chatBubbles from '../../assets/images/chat_bubbles.jpeg';
import {serverURL} from "../../constants";

const styles = {
  width: '100px',
  height: '100px',
  marginRight: '10px'
};

const PostThumbnail = props => {
  let image = chatBubbles;

  if (props.image) {
    image = serverURL + '/uploads/' + props.image;
  }

  return <img alt="post" src={image} style={styles} className="img-thumbnail" />;
};

export default PostThumbnail;