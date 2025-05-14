import { OrderDetail, OrderProduct } from '@/features/work/types/order';
import {
    Page, Text, View, Document, StyleSheet, Font,
    PDFDownloadLink
  } from '@react-pdf/renderer';
  
  Font.register({
    family: 'NanumGothic',
    src: '/fonts/NanumGothic.ttf',
  });
  
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'NanumGothic',
      fontSize: 10,
      padding: 30,
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 20,
    },
    orderNo: {
      textAlign: 'right',
      marginBottom: 10,
    },
    section: {
      marginBottom: 10,
    },
    supplierBox: {
      border: '1pt solid black',
      padding: 5,
      width: '45%',
    },
    orderInfoBox: {
      width: '45%',
    },
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    row: {
      flexDirection: 'row',
      borderBottom: '1pt solid #ccc',
      paddingVertical: 2,
    },
    label: {
      width: '40%',
      fontWeight: 'bold',
    },
    value: {
      width: '60%',
    },
    tableHeader: {
      flexDirection: 'row',
      borderTop: '1pt solid black',
      borderBottom: '1pt solid black',
      fontWeight: 'bold',
      paddingVertical: 4,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottom: '1pt solid #eee',
      paddingVertical: 2,
    },
    cell: {
      width: '12.5%',
      textAlign: 'center',
    }
  });
  
  const MyPDFDocument = ({ data }: { data: OrderDetail }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>발 주 서</Text>
        <Text style={styles.orderNo}>NO. {data.orderNo}</Text>
  
        <View style={styles.topContainer}>
          <View style={styles.orderInfoBox}>
            <Text style={{ marginBottom: 5 }}>발주일: {data.createdAt.toLocaleDateString()}</Text>
            <Text style={{ marginBottom: 10 }}>{data.manager} 귀하</Text>
            <Text style={{ marginBottom: 3 }}>아래와 같이 발주합니다.</Text>
          </View>
  
          <View style={[styles.section, styles.supplierBox]}>
            {[
              ['등록번호', data.licenseNumber],
              ['상호명', data.clientName],
              ['대표자', data.representative],
              ['주소', data.shippingAddress],
              ['업태', data.businessType],
              ['종목', data.businessItem],
              ['연락처', data.managerNumber],
              ['팩스번호', ''],
            ].map(([label, value], idx) => (
              <View style={styles.row} key={idx}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
              </View>
            ))}
          </View>
        </View>
  
        <View style={styles.section}>
          <Text style={{ fontWeight: 'bold' }}>발주금액: (영 원정)</Text>
        </View>
  
        {/* 제품 테이블 */}
        <View style={styles.tableHeader}>
          {['NO', '품명', '규격', '수량', '단가', '공급가액', '세액', '비고'].map((col, idx) => (
            <Text key={idx} style={styles.cell}>{col}</Text>
          ))}
        </View>
        {data.products.map((item: OrderProduct, idx: number) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={styles.cell}>{idx + 1}</Text>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.standard}</Text>
            <Text style={styles.cell}>{item.count}</Text>
            <Text style={styles.cell}>{item.price.toLocaleString()}</Text>
            <Text style={styles.cell}>{(item.price * item.count).toLocaleString()}</Text>
            <Text style={styles.cell}>{((item.price * item.count) * 0.1).toLocaleString()}</Text>
            <Text style={styles.cell}>{''}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
  
  export const PdfButton = ({ data }: { data: OrderDetail }) => (
    <PDFDownloadLink
      document={<MyPDFDocument data={data} />}
      fileName={`${data.orderNo}_발주서.pdf`}
      className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      {({ loading }) => loading ? 'PDF 생성 중...' : `PDF 다운로드`}
    </PDFDownloadLink>
  );