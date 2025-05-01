import React from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDb } from '../../context/DbContext';


const ArticlesModal = ({ business, onClose }) => {
  const db = useDb();

  const deleteArticle = async (id) => {
    const doc = await db.articles.findOne(id).exec();
    if (doc) await doc.remove();
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box className="bg-white max-w-xl mx-auto mt-24 p-6 rounded-lg shadow-lg outline-none">
        <Box className="flex justify-between items-center mb-4">
          <Typography variant="h6">{business.name} — Articles</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider className="mb-4" />

        {business.articles.length === 0 ? (
          <Typography>No articles found.</Typography>
        ) : (
          business.articles.map(article => (
            <Box
              key={article.id}
              className="flex justify-between items-center border-b py-2"
            >
              <Box>
                <Typography className="font-medium">{article.name}</Typography>
                <Typography variant="body2" className="text-gray-600">
                  Qty: {article.qty}, Price: ${article.selling_price}
                </Typography>
              </Box>
              <IconButton onClick={() => deleteArticle(article.id)}>
                <DeleteIcon className="text-red-600" />
              </IconButton>
            </Box>
          ))
        )}
      </Box>
    </Modal>
  );
};

export default ArticlesModal;
