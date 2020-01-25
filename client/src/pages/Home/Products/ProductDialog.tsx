import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";

import { graphql } from "../../../util/graphql";

function PaperComponent(props: any) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const PRODUCT = `
query($id:ID!) {
  product(id: $id) {
    id
    name
    price
    image_url
  }
}
`;

const ProductDialog = ({
  dialogProductId,
  setDialogProductId
}: {
  dialogProductId: number;
  setDialogProductId: any;
}) => {
  const [products, setProducts] = useState({} as any);

  useEffect(() => {
    if (dialogProductId) {
      graphql({
        query: PRODUCT,
        variables: {
          id: dialogProductId
        }
      }).then(result => {
        setProducts(result.product);
      });
    }
  }, [dialogProductId]);
  const handleClose = () => {
    setDialogProductId(0);
  };

  return (
    <div>
      <Dialog
        open={Boolean(dialogProductId)}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          상품 상세정보
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{products.name}</DialogContentText>
          <DialogContentText>
            {(products.price || 0).toLocaleString()}원
          </DialogContentText>
          <img src={products.image_url} alt="상품이미지" />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={handleClose} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductDialog;
