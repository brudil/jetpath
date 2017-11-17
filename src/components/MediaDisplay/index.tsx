import React from 'react';
import Image from '../Image';
import styled from "react-emotion";

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
  media: any; // todo
}

function MediaDisplay({ className, media }: IProps) {
  return (
    <Container className={className}>
      {media.file_type === 'image' || media.fileType === 'image' ? (
        <ImageContainer>
          <Image image={media} width={600} />
        </ImageContainer>
      ) : null}
    </Container>
  );
}

export default MediaDisplay;
