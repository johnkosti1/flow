import {Component, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {DiagramDispatcher} from '../dispatchers/diagram.dispatcher';
import {takeUntil, tap} from 'rxjs/operators';
import {CdkDragDrop} from '@angular/cdk/typings/drag-drop';

declare var cytoscape: any;

@Component({
  selector: 'cy-graph',
  templateUrl: './graph.component.html',
  styles: [`
    ng2-cytoscape {
      height: 50vh;
      float: left;
      width: 100%;
      position: relative;
      border: 2px solid red;
    }`],
})

export class GraphComponent implements OnInit, OnDestroy {

  graphComponentSubject: Subject<void> = new Subject();

  sourceId: string;

  node_name: string;

  layout = {
    name: 'dagre',
    rankDir: 'LR',
    directed: true,
    padding: 0
  };

  nodes: any = [];

  edges: any = [];

  cy: any;

  zoom = {
    min: 0.1,
    max: 1.5,
    current: 1
  };


  constructor() {
  }

  ngOnInit(): void {

    DiagramDispatcher.cyDefined.pipe(
      takeUntil(this.graphComponentSubject),
      tap(this.initializeCy)
    ).subscribe();

    DiagramDispatcher.removeNode.pipe(
      takeUntil(this.graphComponentSubject),
      tap(this.removeNode)
    ).subscribe();

    DiagramDispatcher.removeEdge.pipe(
      takeUntil(this.graphComponentSubject),
      tap(this.removeEdge)
    ).subscribe();

    DiagramDispatcher.addNode.pipe(
      takeUntil(this.graphComponentSubject),
      tap(this.addNode)
    ).subscribe();

    DiagramDispatcher.lineStart.pipe(
      takeUntil(this.graphComponentSubject),
      tap((id) => {
        this.sourceId = id;
      })
    ).subscribe();

    DiagramDispatcher.lineEnd.pipe(
      takeUntil(this.graphComponentSubject),
      tap(this.lineEnd)
    ).subscribe()
  }

  initializeCy = cy => {
    this.cy = cy;
  };

  removeNode = (id) => {
    this.nodes = this.nodes.filter(node => node.data.id !== id);
    this.edges = this.edges.filter(edge => (edge.data.source !== id) && (edge.data.target !== id));
  };

  removeEdge = ({source, target}) => {
    this.edges = this.edges.filter(edge => (edge.data.source !== source) && (edge.data.target !== target))
  };

  addNode = (data) => {
    this.nodes = [...this.nodes, data];
  };

  lineEnd = (id) => {
    this.edges = [...this.edges, {data: {source: this.sourceId, target: id}}]
  };

  zoomIn() {
    this.cy.zoom({
      level: this.zoom.current += 0.1
    })
  }

  zoomOut() {
    this.cy.zoom({
      level: this.zoom.current -= 0.1
    })
  }

  onItemDrop(event) {
    console.log('event: ', event);
    let r = Math.random().toString(36).substring(7);
    this.nodes = [...this.nodes, {
      data: {
        id: r,
        weight: 50,
        height: 50,
        colorCode: 'blue',
        shapeType: 'roundrectangle',
        image: event.dragData.image
      }
    }]
  }

  nodeChange(event) {
    this.node_name = event;
  }

  addChild(parent) {
    this.nodes = [
      ...this.nodes,
      {data: {id: 'z', name: 'zzzzz', weight: 100, colorCode: 'green', shapeType: 'ellipse'}}
    ];

    this.edges = [
      ...this.edges,
      {data: {source: parent.id, target: 'z', colorCode: 'blue', strength: 10}}
    ];
  }


  ngOnDestroy(): void {
    this.graphComponentSubject.next();
    this.graphComponentSubject = void 0;
  }

}
