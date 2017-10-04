import {
  Changeset, ChangesetInstruction, Document, ElementDefinition, ElementPath, InsertChangeset,
  MoveChangeset,
  RemoveChangeset, UpdateChangeset
} from "./interfaces";
import {produceImmutableNode} from "./helpers";

function removeElement(document: Document, changeset: RemoveChangeset) {
  const last = changeset.path.pop();
  const allBut = changeset.path;
  return document.updateIn(allBut, (stream: any) => stream.delete(last)); // todo
}

function insertElement(document: Document, changeset: InsertChangeset) {
  const elementStructure = produceImmutableNode(changeset.element);

  return document.updateIn(changeset.path, (arr: any) => // todo
    arr.splice(changeset.position, 0, elementStructure)
  );
}

function moveElement(document: Document, changeset: MoveChangeset) {
  const last = changeset.path.pop();
  const allBut = changeset.path;

  if (typeof last !== 'number') {
    console.error('failed to move element due to current position not being in stream');
    return document;
  }

  return document.updateIn(allBut, (stream: any) => { // todo
    const selectedElement = stream.get(last);
    return stream
      .splice(last, 1)
      .splice(last + changeset.position, 0, selectedElement);
  });
}

export function isElementDefinition(test: any) {
  return !!Object.hasOwnProperty.call(test, 'identifier');
}

function updateElement(document: Document, changeset: UpdateChangeset) {
  let value = changeset.value;

  if (isElementDefinition(value)) {
    value = produceImmutableNode(value);
  }

  return document.setIn(changeset.path, value);
}

function runChangeset(document: Document, changeset: Changeset) {
  console.log('[spectrum2] changeset', { changeset });

  switch (changeset.instruction) {
    case ChangesetInstruction.MOVE: {
      return moveElement(document, changeset as MoveChangeset);
    }
    case ChangesetInstruction.INSERT: {
      return insertElement(document, changeset as InsertChangeset);
    }
    case ChangesetInstruction.UPDATE: {
      return updateElement(document, changeset as UpdateChangeset);
    }
    case ChangesetInstruction.REMOVE: {
      return removeElement(document, changeset as RemoveChangeset);
    }
  }
}

export function applyChangeset(document: Document, changeset: Array<Changeset> | Changeset): Document {
  let doc = document;

  if (!Array.isArray(changeset)) {
    doc = runChangeset(doc, changeset);
  } else {
    changeset.forEach(change => {
      doc = runChangeset(doc, change);
    })
  }

  return doc;
}

export function changeSubtype(element: ElementDefinition) {
  return {
    instruction: ChangesetInstruction.UPDATE,
    value: element,
    path: ['content'],
  };
}

export function update(path: ElementPath, value: any): UpdateChangeset {
  return {
    instruction: ChangesetInstruction.UPDATE,
    path,
    value
  }
}
export function remove(path: ElementPath): RemoveChangeset {
  return {
    instruction: ChangesetInstruction.REMOVE,
    path,
  }
}

export function move(path: ElementPath, position: number): MoveChangeset {
  return {
    instruction: ChangesetInstruction.REMOVE,
    path,
    position
  }
}
