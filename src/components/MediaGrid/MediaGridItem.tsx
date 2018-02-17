import React from 'react';
import styled from "react-emotion";
import {css} from "emotion";
import layers from "../../themes/layers";
import {OneImage} from "../OneImage";
import {MediaObject} from "../../types";

const PseudoPreview = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props: any) => props.theme.colors.grey_autum};
  color: #ffffff;
  box-sizing: border-box;
  padding: 0.5rem;
  user-select: none;
`;

const Container = styled.li`
  height: 110px;
  width: ${(props: any) => Math.round(110 * props.aspectRatio)}px;
  position: relative;
  display: block;
  float: left;
  margin: 0.35rem;
  cursor: pointer;
`;

const InnerContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  transition: all 300ms ease;
  box-sizing: border-box;

  &:hover {
    transform: scale(1.25);
    background: #ffffff;
    box-shadow: 0 0 12px rgba(30, 30, 30, 0.3);
    z-index: ${layers.mediaGridHover};
  }
`;

const thumbnailStyles = css`
  height: 100%;
  display: block;
`;

interface IProps {
  media: MediaObject;
  onSelect?: (mediaId: number) => void;
  match?: {
    url: string;
  };
  wrap?: (media: MediaObject, children: JSX.Element) => Element;
}

class MediaGridItem extends React.Component<IProps, {}> {
  handleSelect: () => void;

  constructor(props: IProps) {
    super(props);

    this.handleSelect = () => {
      if (this.props.onSelect) {
        this.props.onSelect(this.props.media.mediaId);
      }
    };
  }

  renderImagePreview() {
    const { media } = this.props;

    return (
      <OneImage
        className={thumbnailStyles}
        src={media.resourceName}
        aspectRatio={{ width: media.object.width, height: media.object.height }}
        alt=""
      />
    );
  }

  renderPseudoPreview() {
    const { media } = this.props;
    return (
      <PseudoPreview>
        <span>{media.mime}</span>
      </PseudoPreview>
    );
  }

  renderInner() {
    const { media } = this.props;

    return (
      <InnerContainer>
        {media.fileType === 'image'
          ? this.renderImagePreview()
          : this.renderPseudoPreview()}
      </InnerContainer>
    );
  }

  render() {
    const { media, wrap } = this.props;
    return (
      <Container
        aspectRatio={media.object.width / media.object.height}
      >
        {wrap ? (
          wrap(media, this.renderInner())
        ) : (
          <div onClick={this.handleSelect}>{this.renderInner()}</div>
        )}
      </Container>
    );
  }
}

export default MediaGridItem;
