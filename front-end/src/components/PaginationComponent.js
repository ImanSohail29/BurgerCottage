import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const PaginationComponent = ({
  categoryName,
  paginationLinksNumber,
  pageNum,
}) => {
  const category = categoryName ? `category/${categoryName}/` : "";
  const url = `/foodItem-list/${category}`;

  return (
    <Pagination>
      <LinkContainer to={`${url}${pageNum - 1}`}>
        <Pagination.Prev disabled={pageNum === 1} />
      </LinkContainer>
      {[...Array(paginationLinksNumber).keys()].map((x) => (
        <LinkContainer key={x + 1} to={`${url}${x + 1}`}>
          <Pagination.Item active={x + 1 === pageNum}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
      <LinkContainer
        disabled={pageNum === paginationLinksNumber}
        to={`${url}${pageNum + 1}`}
      >
        <Pagination.Next />
      </LinkContainer>
    </Pagination>
  );
};

export default PaginationComponent;
