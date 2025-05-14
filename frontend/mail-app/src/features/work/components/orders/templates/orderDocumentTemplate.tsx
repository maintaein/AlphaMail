import { OrderDetail } from '@/features/work/types/order';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Font
} from '@react-pdf/renderer';

Font.register({
  family: 'NanumGothic',
  src: '/fonts/NanumGothic.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'NanumGothic',
  },
  section: { marginBottom: 10 },
  header: { fontSize: 20, marginBottom: 20 },
  row: { flexDirection: 'row', marginBottom: 5 },
  label: { width: 100, fontWeight: 'bold' },
  value: { flex: 1 }
});

const MyPDFDocument = ({ data }: { data: OrderDetail }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>발주서</Text>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>발주 번호:</Text>
          <Text style={styles.value}>{data.orderNo}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>발주자:</Text>
          <Text style={styles.value}>{data.userName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>거래처:</Text>
          <Text style={styles.value}>{data.clientName}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export const PdfButton = ({ data }: { data: OrderDetail }) => (
  <PDFDownloadLink
    document={<MyPDFDocument data={data} />}
    fileName={`${data.orderNo}_발주서.pdf`}
    className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
  >
    {({ loading }) => loading ? 'PDF 생성 중...' : `${data.orderNo} PDF 다운로드`}
  </PDFDownloadLink>
);
