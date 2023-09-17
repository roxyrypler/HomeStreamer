import { Express } from 'express';
import GET from './GET';
import POST from './POST';

export default function API(app: Express) {
    app.post('/api/indexing', POST.Indexing);
}