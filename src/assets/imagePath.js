const imagePaths = [
  {id: '1010001', uri: require('../assets/exerciseImages/00251101.png')},
  {id: '1020002', uri: require('../assets/exerciseImages/00271101.png')},
  {id: '1070003', uri: require('../assets/exerciseImages/00321101.png')},
  {id: '1010004', uri: require('../assets/exerciseImages/00471101.png')},
  {id: '1010005', uri: require('../assets/exerciseImages/02891101.png')},
  {id: '1020006', uri: require('../assets/exerciseImages/02921101.png')},
  {id: '1010007', uri: require('../assets/exerciseImages/03081101.png')},
  {id: '1010008', uri: require('../assets/exerciseImages/03141101.png')},
  {id: '1030009', uri: require('../assets/exerciseImages/03341101.png')},
  {id: '1000010', uri: require('../assets/exerciseImages/05851101.png')},
  {id: '2060011', uri: require('../assets/exerciseImages/00011101.png')},
  {id: '1050012', uri: require('../assets/exerciseImages/00311101.png')},
  {id: '1010013', uri: require('../assets/exerciseImages/00331101.png')},
  {id: '1000014', uri: require('../assets/exerciseImages/00431101.png')},
  {id: '1020015', uri: require('../assets/exerciseImages/01971101.png')},
  {id: '1040016', uri: require('../assets/exerciseImages/02001101.png')},
  {id: '1020017', uri: require('../assets/exerciseImages/02931101.png')},
  {id: '1050018', uri: require('../assets/exerciseImages/02971101.png')},
  {id: '1010019', uri: require('../assets/exerciseImages/03191101.png')},
  {id: '1030020', uri: require('../assets/exerciseImages/04051101.png')},
  {id: '1020021', uri: require('../assets/exerciseImages/04061101.png')},
  {id: '4060022', uri: require('../assets/exerciseImages/04651101.png')},
  {id: '1000023', uri: require('../assets/exerciseImages/05861101.png')},
  {id: '1010024', uri: require('../assets/exerciseImages/05961101.png')},
  {id: '1000025', uri: require('../assets/exerciseImages/05991101.png')},
  {id: '2020026', uri: require('../assets/exerciseImages/06521101.png')},
  {id: '2010027', uri: require('../assets/exerciseImages/06621101.png')},
  {id: '1000028', uri: require('../assets/exerciseImages/10601101.png')},
  {id: '2060029', uri: require('../assets/exerciseImages/00061101.png')},
  {id: '2020030', uri: require('../assets/exerciseImages/00171101.png')},
  {id: '1000031', uri: require('../assets/exerciseImages/00421101.png')},
  {id: '1050032', uri: require('../assets/exerciseImages/00701101.png')},
  {id: '1070033', uri: require('../assets/exerciseImages/00851101.png')},
  {id: '1020034', uri: require('../assets/exerciseImages/00951101.png')},
  {id: '1070035', uri: require('../assets/exerciseImages/01161101.png')},
  {id: '1070036', uri: require('../assets/exerciseImages/01171101.png')},
  {id: '1020037', uri: require('../assets/exerciseImages/01181101.png')},
  {id: '1020038', uri: require('../assets/exerciseImages/01201101.png')},
  {id: '1020039', uri: require('../assets/exerciseImages/01501101.png')},
  {id: '1050040', uri: require('../assets/exerciseImages/01651101.png')},
  {id: '1010041', uri: require('../assets/exerciseImages/01791101.png')},
  {id: '1020042', uri: require('../assets/exerciseImages/01801101.png')},
  {id: '1010043', uri: require('../assets/exerciseImages/01881101.png')},
  {id: '1030044', uri: require('../assets/exerciseImages/01921101.png')},
  {id: '1040045', uri: require('../assets/exerciseImages/02011101.png')},
  {id: '1010046', uri: require('../assets/exerciseImages/02271101.png')},
  {id: '2010047', uri: require('../assets/exerciseImages/02511101.png')},
  {id: '2010048', uri: require('../assets/exerciseImages/02791101.png')},
  {id: '1030049', uri: require('../assets/exerciseImages/02901101.png')},
  {id: '1050050', uri: require('../assets/exerciseImages/02941101.png')},
  {id: '1010051', uri: require('../assets/exerciseImages/03011101.png')},
  {id: '1030052', uri: require('../assets/exerciseImages/03101101.png')},
  {id: '1050053', uri: require('../assets/exerciseImages/03131101.png')},
  {id: '1040054', uri: require('../assets/exerciseImages/03331101.png')},
  {id: '1030055', uri: require('../assets/exerciseImages/03781101.png')},
  {id: '1030056', uri: require('../assets/exerciseImages/03801101.png')},
  {id: '1030057', uri: require('../assets/exerciseImages/04261101.png')},
  {id: '1010058', uri: require('../assets/exerciseImages/04331101.png')},
  {id: '1070059', uri: require('../assets/exerciseImages/05491101.png')},
  {id: '1000060', uri: require('../assets/exerciseImages/05971101.png')},
  {id: '1000061', uri: require('../assets/exerciseImages/05981101.png')},
  {id: '1030062', uri: require('../assets/exerciseImages/06021101.png')},
  {id: '1000063', uri: require('../assets/exerciseImages/06051101.png')},
  {id: '3080064', uri: require('../assets/exerciseImages/06301101.png')},
  {id: '5080065', uri: require('../assets/exerciseImages/06841101.png')},
  {id: '6080066', uri: require('../assets/exerciseImages/06851101.png')},
  {id: '4060067', uri: require('../assets/exerciseImages/07151101.png')},
  {id: '1010068', uri: require('../assets/exerciseImages/07571101.png')},
  {id: '1010069', uri: require('../assets/exerciseImages/10301101.png')},
  {id: '2070070', uri: require('../assets/exerciseImages/11601101.png')},
  {id: '3080071', uri: require('../assets/exerciseImages/11611101.png')},
  {id: '1030072', uri: require('../assets/exerciseImages/11651101.png')},
  {id: '2020073', uri: require('../assets/exerciseImages/13261101.png')},
  {id: '1030074', uri: require('../assets/exerciseImages/14541101.png')},
  {id: '1030075', uri: require('../assets/exerciseImages/21371101.png')},
  {id: '6080076', uri: require('../assets/exerciseImages/21381101.png')},
  {id: '5080077', uri: require('../assets/exerciseImages/24901101.png')},
  {id: '3080078', uri: require('../assets/exerciseImages/26121101.png')},
];
export default imagePaths;
