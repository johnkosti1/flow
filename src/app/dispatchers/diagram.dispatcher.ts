import {Subject} from 'rxjs/internal/Subject';


export class DiagramDispatcher {

  public static removeNode: Subject<any> = new Subject();
  public static removeEdge: Subject<any> = new Subject();

  public static addNode: Subject<any> = new Subject();

  public static lineStart: Subject<any> = new Subject();
  public static lineEnd: Subject<any> = new Subject();

  public static cyDefined: Subject<any> = new Subject();
}
