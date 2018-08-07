import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, } from "@ngrx/effects";
import { ProductService } from "../product.service";

import * as productActions from './product.actions';
import { mergeMap, map, catchError, merge } from "rxjs/operators";
import { of } from 'rxjs';
import { Product } from "../product";


@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions,
        private productService: ProductService) { }

    @Effect()
    loadProducts$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.Load),
        mergeMap((action: productActions.Load) => this.productService.getProducts().pipe(
            map((products: Product[]) => (new productActions.LoadSuccess(products))),
            catchError(error => of(new productActions.LoadFail(error)))
        ))
    )

    @Effect()
    updateProduct$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.UpdateProduct),
        map((action: productActions.UpdateProduct) => action.payload),
        mergeMap((product: Product) =>
            this.productService.updateProduct(product).pipe(
                map(updatedProduct => (new productActions.UpdateProductSuccess(updatedProduct))),
                catchError(err => of(new productActions.UpdateProductFail(err)))
            )
        )
    );

    @Effect()
    createProduct$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.CreateProduct),
        map((action: productActions.CreateProduct) => action.payload),
        mergeMap((product: Product) =>
            this.productService.createProduct(product).pipe(
                map(createdProduct => (new productActions.CreateProductSuccess(createdProduct))),
                catchError(err => of(new productActions.CreateProductFail(err)))
            )
        )
    )

    @Effect()
    deleteProduct$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.DeleteProduct),
        map((action: productActions.DeleteProduct) => action.payload),
        mergeMap((productId: number) =>
            this.productService.deleteProduct(productId).pipe(
                map(() => (new productActions.DeleteProductSuccess(productId))),
                catchError(err => of(new productActions.DeleteProductFail(err)))
            )
        )
    )
}