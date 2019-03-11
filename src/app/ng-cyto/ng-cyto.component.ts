import {Component, OnChanges, Renderer, ElementRef, Input, Output, EventEmitter, OnInit} from '@angular/core';

declare var cytoscape: any;
import contextMenus from 'cytoscape-context-menus';
import $ from 'jquery';
import {edgeData} from '../../helpers';
import {DiagramDispatcher} from '../dispatchers/diagram.dispatcher';

if(!contextMenus){
  cytoscape.use(contextMenus, $);

}

@Component({
  selector: 'ng2-cytoscape',
  template: '<div id="cy"></div>',
  styles: [`#cy {
    height: 100%;
    width: 100%;
    position: relative;
    left: 0;
    top: 0;
  }`]
})


export class NgCytoComponent implements OnChanges {

  @Input() public nodes: any;
  @Input() public edges: any;
  @Input() public style: any;
  @Input() public layout: any;
  @Input() public zoom: any;
  @Input() public startLine: any;

  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  public constructor(private renderer: Renderer, private el: ElementRef) {

    this.layout = this.layout || {
      name: 'grid',
      directed: true,
      padding: 0
    };

    this.style = this.style || cytoscape.stylesheet()
      .selector('node')
      .css({
        'shape': 'data(shapeType)',
        // 'width': 'mapData(weight, 100, 100, 50, 60)',
        'content': 'data(name)',
        'text-valign': 'center',
        'text-outline-width': 1,
        'text-outline-color': 'data(colorCode)',
        'background-color': 'red',
        'color': '#fff',
        'font-size': 10,
        'height': 'data(height)',
        'width': 'data(weight)',
        'background-fit': 'contain',
        'background-image': 'data(image)',
        'background-size': 'contain',
        'background-opacity': '0',
      })
      .selector(':selected')
      .css({
      })
      .selector('edge')
      .css({
        'curve-style': 'bezier',
        'opacity': 0.666,
        'width': 2,
        'target-arrow-shape': 'triangle',
        'line-color': 'black',
        'source-arrow-color': 'black',
        'target-arrow-color': 'black'
      })
      .selector('edge.questionable')
      .css({
        'line-style': 'dotted',
        'target-arrow-shape': 'diamond'
      })
      .selector('.faded')
      .css({
        'opacity': 0.25,
        'text-opacity': 0
      });
  }

  public ngOnChanges(changes): any {
    console.log('changes: ', changes)
    // const startLine = changes.startLine;
    // if(startLine && !startLine.previousValue && startLine.currentValue){
    //
    // } else {
      this.render();
    // }
  }



  public render() {
    const startLine = this.startLine;
    let cy_contianer = this.renderer.selectRootElement('#cy');
    let localselect = this.select;
    let cy = cytoscape({
      container: cy_contianer,
      layout: this.layout,
      userZoomingEnabled: false,
      zoomingEnabled: true,
      zoom: this.zoom.current,
      // level: this.zoom.current,
      minZoom: this.zoom.min,
      maxZoom: this.zoom.max,
      style: this.style,
      elements: {
        nodes: this.nodes,
        edges: this.edges
      },
      textureOnViewport: true
    });

    DiagramDispatcher.cyDefined.next(cy);

    cy.contextMenus({
      // List of initial menu items
      menuItems: [
        {
          id: 'remove', // ID of menu item
          content: 'remove', // Display content of menu item
          tooltipText: 'remove', // Tooltip text for menu item
          // Filters the elements to have this menu item on cxttap
          // If the selector is not truthy no elements will have this menu item on cxttap
          selector: 'node, edge',
          onClickFunction: function (event) { // The function to be executed on click
            var target = event.target || event.cyTarget;
            if(target.data('id')){
              DiagramDispatcher.removeNode.next(target.data('id'))
            } else {
              DiagramDispatcher.removeEdge.next({
                source: target.data('source'),
                id: target.data('target')
              })
            }

            // target.remove();
          },
          disabled: false, // Whether the item will be created as disabled
          hasTrailingDivider: true, // Whether the item will have a trailing divider
          coreAsWell: false // Whether core instance have this item on cxttap
        },
        {
          image: {src: 'assets/command-ico.svg', width: 12, height: 12, x: 6, y: 4},
          id: 'hide',
          content: 'disable',
          tooltipText: 'disable',
          selector: 'node, edge',
          onClickFunction: function (event) {
            var target = event.target || event.cyTarget;

            target.addClass('faded')
          },
        },
        {
          image: {src: 'assets/command-ico.svg', width: 12, height: 12, x: 6, y: 4},
          id: 'make-line',
          content: 'make line',
          tooltipText: 'make line',
          selector: 'node, edge',
          onClickFunction: function (event) {
            var target = event.target || event.cyTarget;

            DiagramDispatcher.lineStart.next(target.data('id'))
          },
        },
        {
          id: 'add-node',
          content: 'add node',
          tooltipText: 'add node',
          selector: 'node',
          coreAsWell: true,
          onClickFunction: function (event) {
            const target = event.target;
            let r = Math.random().toString(36).substring(7);
            var data = {
              group: 'nodes',
              id: r,
              weight: 60,
              height: 60,
              shapeType: 'roundrectangle',
              image: '/assets/data-quality.svg',
              classes: ['svg'],
            };


            var pos = event.position || event.cyPosition;

            DiagramDispatcher.addNode.next({
              data: data,
              position: {
                x: pos.x,
                y: pos.y
              },
              target
            });


            if (target.data) {
              let targetId = target.data('id')

              cy.add([{
                data: data,
                position: {
                  x: pos.x,
                  y: pos.y
                },
                target,
              },
                edgeData(targetId, r)]
              )
            } else {
              cy.add([{
                  data: data,
                  position: {
                    x: pos.x,
                    y: pos.y
                  },
                  target,
                }]
              )
            }
          }
        }
      ],
      // css classes that menu items will have
      menuItemClasses: [
        // add class names to this list
      ],
      // css classes that context menu will have
      contextMenuClasses: [
        // add class names to this list
      ]
    });

    cy.on('tap', 'node', function (e) {
      var target = e.target;

      console.log('node tapped', startLine);

      if(startLine){
        DiagramDispatcher.lineEnd.next(target.data('id'))
        DiagramDispatcher.lineStart.next(null)
      }

      // var neighborhood = node.neighborhood().add(node);
      //
      // cy.elements().addClass('faded');
      // neighborhood.removeClass('faded');
      // localselect.emit(node.data('name'));
    });

    cy.on('tap', function (e) {
      if (e.target === cy) {
        cy.elements().removeClass('faded');
      }
    });
  }

}
