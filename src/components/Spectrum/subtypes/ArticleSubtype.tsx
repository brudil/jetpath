import React from 'react';
import ElementStream from '../ElementStream';
import {ElementPath} from "../../../libs/spectrum2/interfaces";

interface IProps {
  update: () => void,
  data: any,
  path: ElementPath,
}

function ArticleSubtype(props: IProps) {
  const { data, path, update } = props;
  return (
    <ElementStream
      className="spectrum__top-stream"
      data={data}
      index="stream"
      path={path}
      update={update}
    />
  );
}

export default ArticleSubtype;
