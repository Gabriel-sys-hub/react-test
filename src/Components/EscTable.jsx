import React, { useState, useCallback, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import './styles.css';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function EscTable() {
  const classes = useStyles();

  const [schoolDetail, setSchoolDetail] = useState([]);

  const [schoolFilter, setSchoolFilter] = useState([]);

  const [selectFilter, setSelectFilter] = useState([]);

  const getSchoolDetails = useCallback(() => {
    fetch("https://hom-escolaaberta.sme.prefeitura.sp.gov.br/api/smeescolas/")
      .then((resolve) => resolve.json())
      .then((result) => setSchoolDetail(result.results));
  }, [setSchoolDetail]);

  const getDiretoriaInicial = useCallback(() => {
    fetch(`https://hom-escolaaberta.sme.prefeitura.sp.gov.br/api/diretorias/`)
      .then((resolve) => resolve.json())
      .then((result) => setSchoolFilter(result.results));
  }, [setSchoolFilter]);

  const filterSelectDiretoria = (dre) => {
    fetch(
      `https://hom-escolaaberta.sme.prefeitura.sp.gov.br/api/smeescolas/${dre}`
    )
      .then((resolve) => resolve.json())
      .then((result) => setSelectFilter(result.results));
  };

  useEffect(() => {
    getSchoolDetails();
    getDiretoriaInicial();
  }, [getSchoolDetails, getDiretoriaInicial]);

  if (schoolDetail.length > 0) {
    var maior0 = schoolDetail.map(school => school.count < 250 && school.count).reduce((acc, num) => acc + num);
    var maior251 = schoolDetail.map(school => school.count > 251 & school.count < 500 && school.count).reduce((acc, num) => acc + num);
    var maior501 = schoolDetail.map(school => school.count > 501 & school.count < 1000 && school.count).reduce((acc, num) => acc + num);
    var maior1001 = schoolDetail.map(school => school.count > 1001 & school.count < 1500 && school.count).reduce((acc, num) => acc + num);
    var maior1501 = schoolDetail.map(school => school.count > 1501 & school.count < 2000 && school.count).reduce((acc, num) => acc + num);
    var maior2001 = schoolDetail.map(school => school.count > 2001 & school.count < 2500 && school.count).reduce((acc, num) => acc + num);
    var maior2501 = schoolDetail.map(school => school.count > 2501 && school.count).reduce((acc, num) => acc + num);
    var total = schoolDetail.map(school => school.count).reduce((acc, num) => acc + num);
  }

  return (
    <TableContainer component={Paper}>
      <div className="title_container">
        <h1 className="title">
          Escolas por tipo e quantidade de alunos
        </h1>
      </div>
      <Table
        className={classes.table}
        size="small"
        stickyHeader
        aria-label="sticky table"
      >
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>
              <select
                onChange={(event) => filterSelectDiretoria(event.target.value)}
              >
                {schoolFilter &&
                  schoolFilter.map((result) => (
                    <option key={result.dre} value={result.dre}>
                      {result.dre}
                    </option>
                  ))}
                ;
              </select>
            </StyledTableCell>
            <StyledTableCell align="right">1 a 250 estudantes</StyledTableCell>
            <StyledTableCell align="right">
              251 a 500 estudantes
            </StyledTableCell>
            <StyledTableCell align="right">
              501 a 1000 estudantes
            </StyledTableCell>
            <StyledTableCell align="right">
              1001 a 1500 estudantes
            </StyledTableCell>
            <StyledTableCell align="right">
              1501 a 2000 estudantes
            </StyledTableCell>
            <StyledTableCell align="right">
              2001 a 2500 estudantes
            </StyledTableCell>
            <StyledTableCell align="right">
              Mais de 2500 estudantes
            </StyledTableCell>
            <StyledTableCell align="right">
              Total Alunos
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {selectFilter.length > 0
            ? selectFilter.map((result, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {result.tipoesc}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {result.count < 250 && result.count}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {(result.count < 500) & (result.count > 251)
                      ? result.count
                      : 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {(result.count < 1000) & (result.count > 501)
                      ? result.count
                      : 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {(result.count < 1500) & (result.count > 1001)
                      ? result.count
                      : 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {(result.count < 2000) & (result.count > 1501)
                      ? result.count
                      : 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {(result.count < 2500) & (result.count > 2001)
                      ? result.count
                      : 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {result.count > 2501 ? result.count : 0}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            : schoolDetail &&
              schoolDetail.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.tipoesc}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.count < 250 && row.count}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {(row.count < 500) & (row.count > 251) ? row.count : 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {(row.count < 1000) & (row.count > 501) ? row.count : 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {(row.count < 1500) & (row.count > 1001) ? row.count : 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {(row.count < 2000) & (row.count > 1501) ? row.count : 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {(row.count < 2500) & (row.count > 2001) ? row.count : 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.count > 2501 ? row.count : 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.count}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
             <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    <h2>Alunos</h2>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <h2>{ maior0 }</h2>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <h2>{ maior251 }</h2>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <h2>{ maior501 }</h2>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <h2>{ maior1001 }</h2>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <h2>{ maior1501 }</h2>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <h2>{ maior2001 }</h2>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <h2>{ maior2501 }</h2>
                  </StyledTableCell>
                  <StyledTableCell>
                    <h2>{ total }</h2>
                  </StyledTableCell>
                </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
