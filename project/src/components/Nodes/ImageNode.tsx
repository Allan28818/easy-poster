import { DecoratorNode, LexicalNode, NodeKey } from "lexical";
import { ReactNode } from "react";
import Image from "next/image";

export class ImageNode extends DecoratorNode<ReactNode> {
  __src: string | undefined;

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src || "", node.__key);
  }

  constructor(src: string, key?: NodeKey) {
    super(key);
    this.__src = src;
  }

  createDOM(): HTMLElement {
    return document.createElement("div");
  }

  updateDOM(): false {
    return false;
  }

  decorate(): ReactNode {
    return <Image src={this.__src || ""} />;
  }
}

function $createImageNode(src: string) {
  return new ImageNode(src);
}

function $isImageNode(node: LexicalNode | null | undefined): node is ImageNode {
  return node instanceof ImageNode;
}

export { $createImageNode, $isImageNode };
