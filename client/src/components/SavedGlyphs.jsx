import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';

import Glyph from './Glyph';
import { fetchGlyphs } from '../api';
import { createGlyphFromGlyphData } from '../helpers/glyphs';


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
        const newGlyphs = response.data.data.docs.map(createGlyphFromGlyphData);
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
          {(new Array(totalPages))
            .fill(null)
            .map((nothing, index) => index + 1)
            .map((pageNumber) => (
              <PaginationItem
                key={`${totalPages}-${pageNumber}`}
                active={page === pageNumber}
              >
                <PaginationLink onClick={changePage} data-page={pageNumber}>
                  {pageNumber}
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
