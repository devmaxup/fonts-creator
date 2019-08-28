import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Card,
  CardBody,
} from 'reactstrap';
import * as opentype from 'opentype.js';
import axios from 'axios';

import { API_URLS } from '../constants';
import Glyph from './Glyph';

const fetchGlyphs = (page = 1) => axios.get(API_URLS.GYPHS, {
  params: {
    page,
  },
});

const createGlyphFromPathData = (glyphData) => {
  const path = new opentype.Path();
  const pathDataList = glyphData.pathData
    .replace(/([A-Z])/g, ';$1')
    .replace(/^;/, '')
    .split(';');

  pathDataList.forEach((pathData) => {
    const command = pathData[0];
    const args = pathData.slice(1).split(' ').map(parseFloat);

    switch (command) {
      case 'M':
        path.moveTo(...args);
        return;
      case 'L':
        path.lineTo(...args);
        break;
      case 'Q':
        path.quadTo(...args);
        break;
      case 'C':
        path.curveTo(...args);
        break;
      case 'Z':
        path.close(...args);
        break;
      default:
        throw new Error(`Unexpected path command ${pathData}`);
    }
  });


  const glyph = new opentype.Glyph({
    name: glyphData.name,
    unicode: glyphData.unicode,
    advanceWidth: glyphData.advanceWidth || 650,
    path,
  });
  glyph._id = glyphData.id;

  return glyph;
};


const SavedGlyphs = ({ onGlyphClick }) => {
  const [glyphs, setGlyphs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const callOnGlyphClick = useCallback((e) => {
    e.preventDefault();
    const { id } = e.currentTarget.dataset;
    const glyph = glyphs.find(({ _id }) => _id === id);

    onGlyphClick(glyph);
  }, [onGlyphClick, glyphs]);

  const changePage = useCallback((e) => {
    e.preventDefault();
    setPage(+e.currentTarget.dataset.page);
  }, []);

  useEffect(() => {
    fetchGlyphs(page)
      .then((response) => {
        const newGlyphs = response.data.data.docs.map(createGlyphFromPathData);
        setGlyphs(newGlyphs);
        setTotalPages(response.data.data.pages);
      });
  }, [page]);

  return (
    <>
      <Card className="mb-2">
        <CardBody>
          {glyphs.map((glyph) => (
            <Glyph key={glyph._id} glyph={glyph} onClick={callOnGlyphClick} data-id={glyph._id} className="clickable" />
          ))}
        </CardBody>
      </Card>

      {totalPages > 1 && (
        <Pagination>
          <PaginationItem disabled={page === 1}>
            <PaginationLink onClick={changePage} data-page={1} first />
          </PaginationItem>
          {(new Array(totalPages)).fill(null).map((nothing, index) => (
            <PaginationItem key={index} active={page === index + 1}>
              <PaginationLink onClick={changePage} data-page={index + 1}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem disabled={page === totalPages}>
            <PaginationLink onClick={changePage} data-page={totalPages} last />
          </PaginationItem>
        </Pagination>
      )}
    </>
  );
};

SavedGlyphs.propTypes = {
  onGlyphClick: PropTypes.func.isRequired,
};

export default SavedGlyphs;
