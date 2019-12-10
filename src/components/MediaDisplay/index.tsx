import React from 'react';
import { OneImage } from '../OneImage';
import styled from '@emotion/styled';
import {MediaObject} from "../../types";

const Container = styled.div`
  width: 100%;
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

interface IProps {
  className?: string;
  media: MediaObject; // todo
}

const MediaDisplay: React.FC<IProps> = ({ className, media }) => {
  return (
    <Container className={className}>
      {media.file_type === 'image' || media.fileType === 'image' ? (
        <ImageContainer>
          <OneImage
            src={media.resourceName}
            aspectRatio={media.object}
            alt=""
          />
        </ImageContainer>
      ) : null}
    </Container>
  );
}

export default MediaDisplay;
